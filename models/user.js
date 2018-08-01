const mongoose = require('mongoose');
const validator = require('validator');
const {
  sign
} = require('jsonwebtoken');
const {
  pick
} = require('lodash');


let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
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

userSchema.methods.toJSON = function() {
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

const User = mongoose.model("User", userSchema);

module.exports = {
  User
}