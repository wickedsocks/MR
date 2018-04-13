require("../../dbconfig/config");
const { Router } = require("express");
const { Order } = require('../../models/order');

const router = Router();

router.post('/orders', async (req, res) => {
  let newOrder = new Order({ 
    name: req.body.name,
    products: req.body.products,
    email: req.body.email,
    tel: req.body.tel,
    comment: req.body.comment
  });
  try {
    let orderStatus = await newOrder.save(); 
    res.send(orderStatus);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;