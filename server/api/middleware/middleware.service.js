const {
  User
} = require('../../../models/user');

async function authenticate(req, res, next) {
  const token = req.header('x-auth');
  try {
    let user = await User.findByToken(token);
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

// NOTE: isAdmin middleware works in pair with authenticate, should follow after authenticate
async function isAdmin(req, res, next) {
  try {
    if (!req.user || !req.user.admin) {
      throw "User not admin action denied";
    }
    next();
  } catch (e) {
    res.status(401).send(req.user);
  }
}

module.exports = {
  authenticate,
  isAdmin
}