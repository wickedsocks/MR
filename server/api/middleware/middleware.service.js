const {
  User
} = require('../../../models/user');

async function authenticate(req, res, next) {
  const token = req.header('x-auth');
  try {
    let user = await User.findByToken(token)
    if (!user) {
      throw "User in undefined";
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
}

module.exports = {
  authenticate
}