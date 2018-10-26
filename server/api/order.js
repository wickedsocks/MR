require("../../dbconfig/config");
const mailgun = require('./../mailgun');
const {
  Router
} = require("express");
const {
  Order
} = require('../../models/order');
const {
  Product
} = require('../../models/product');

const router = Router();

router.post('/orders', async (req, res) => {
  let newOrder = new Order({
    name: req.body.name,
    products: req.body.products,
    email: req.body.email,
    tel: req.body.tel,
    comment: req.body.comment,
    totalPrice: req.body.totalPrice
  });
  try {
    let orderStatus = await newOrder.save();
    // res.send(orderStatus);

    function getProductNameAndQuantityById(id, quantity) {
      return Product.findById(id).then((product) => {
        return {
          product,
          quantity
        };
      })
    }
    let sortedProducts = req.body.products.map((item) => {
      return getProductNameAndQuantityById(item.id, item.quantity);
    });
    Promise.all(sortedProducts).then((products) => {
      let productText = products.map((item) => {
        return `${item.product.title} в количестве - ${item.quantity}`;
      }).join(',\n');

      const customerMessage = {
        from: 'Заказ на сайте Михайловские ряды',
        to: req.body.email,
        subject: 'Подтверждение заказа',
        text: `Здравствуйте ${req.body.name}, Вы заказали: ${productText}, общей стоимостью ${req.body.totalPrice} грн, с Вами свяжутся для подтверждения заказа в ближайщее время`
      };
      const ownerMessage = {
        from: 'Заказ на сайте Михайловские ряды',
        to: 'mykhailovpm@gmail.com',
        subject: 'Новый заказ',
        text:
        `Новый заказ от ${req.body.name},
         Контактная информация:
         - Эл. почта - ${req.body.email},
         - Телефон - ${req.body.tel}.
          Заказали: ${productText},
          - общей стоимостью: ${req.body.totalPrice} грн,
          - пожелания к заказу: ${req.body.comment}`
      };
      mailgun.messages().send(ownerMessage, (err, body) => {
        if (err) {
          res.status(400).send(err);
        }
        res.send(body);
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/orders', async (req, res) => {
  Order.find({}).then((orders) => {
    res.send(orders);
  }, (err) => {
    res.status(400).send(err);
  });
})

module.exports = router;