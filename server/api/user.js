const {
  pick
} = require('lodash');
require('../../dbconfig/config');
const {
  Router
} = require('express');
const {
  User
} = require('../../models/user');

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

module.exports = router;