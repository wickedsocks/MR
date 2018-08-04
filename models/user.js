const mongoose = require('mongoose');
const validator = require('validator');
const {
  sign,
  verify
} = require('jsonwebtoken');
const {
  pick
} = require('lodash');
const bcrypt = require('bcryptjs');


let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,
    validate: {
      validator: validator.isEmail,
      msg: `{VALUE} is not valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function () {
  let userObj = this.toObject();
  return pick(userObj, ['name', 'email', '_id']);
}

userSchema.methods.generateAuthToken = function (params) {
  const user = this;
  const access = 'auth';
  let token = sign({
    id: user._id.toHexString(),
    access
  }, 'abc123').toString();
  user.tokens = user.tokens.concat([{
    token,
    access
  }]);
  return user.save().then(() => {
    return token;
  });
}
userSchema.statics.findByToken = function (token) {
  const user = this;
  let decoded;

  try {
    decoded = verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  return user.findOne({
    _id: decoded.id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

userSchema.statics.findByCredentials = async function (email, password) {
  const user = this;

  let foundUser = await user.findOne({
    email
  });
  if (!foundUser) {
    return Promise.reject();
  }

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, foundUser.password, (err, res) => {
      if (res) {
        resolve(foundUser); 
      } else {
        reject();
      }
    });
  })

};

userSchema.methods.removeToken = function(token) {
  const user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})

const User = mongoose.model("User", userSchema);

module.exports = {
  User
}