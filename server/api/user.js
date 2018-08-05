require('../../dbconfig/config');
const {
  pick
} = require('lodash');
const {
  Router
} = require('express');
const {
  User
} = require('../../models/user');
const {
  authenticate,
  isAdmin
} = require('./middleware/middleware.service');
const {
  compare
} = require('bcryptjs');

const router = Router();

router.post('/users', async (req, res) => {
  let body = pick(req.body, ['name', 'email', 'password']);
  let newUser = new User(body);
  try {
    let userSaved = await newUser.save();
    let userToken = await newUser.generateAuthToken();
    res.header('x-auth', userToken).send(userSaved.toJSON());
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get('/users/me', authenticate, async (req, res) => {
  res.send(req.user);
});

router.post('/users/login', async (req, res) => {
  let body = pick(req.body, ['email', 'password']);
  try {
    let user = await User.findByCredentials(body.email, body.password);
    let token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(401).send(e);
  }
});

router.delete('/users/logout', authenticate, async (req, res) => { 
 try {
  await req.user.removeToken(req.token);
  res.send();
 } catch (e) {
   res.status(400).send(e);
 }
});

router.get('/is-admin', authenticate, isAdmin, async (req, res) => {
  res.send(req.user);
});

module.exports = router;