import { Router } from "express";
import { Product } from "../../models/product";

const router = Router();

router.post("/products", (req, res) => {
  console.log('req ', req.body);
  let newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    currency: req.body.currency

  });
  newProduct.save().then(
    (success) => {
      res.send(success);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.get("/products", (req, res) => {
  Product.find({}).then((products) => {
    res.send(products);
  }, (err) => {
    res.status(400).send(err);
  })
})

export default router;