require('../../dbconfig/config');
const { Router } = require('express');
const {
  CategoryManufacture,
  CategoryProduct
} = require('../../models/category');
const {Product} = require('../../models/product');

const router = Router();

router.post('/categories/manufacture', (req, res) => {
  let trimmedName = req.body.name.trim();
  let newCategory = new CategoryManufacture({
    description: req.body.description,
    name: trimmedName,
    url: Product.productUrlNaming(req.body.name),
    used: false
  });

  newCategory.save().then(
    success => {
      res.send(success);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.get('/categories/manufacture', (req, res) => {
  CategoryManufacture.find({}).then(
    categories => {
      res.send(categories);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.post('/categories/product', (req, res) => {
  let trimmedName = req.body.name.trim();
  let newProductCategory = new CategoryProduct({
    description: req.body.description,
    name: trimmedName,
    url: Product.productUrlNaming(req.body.name),
    used: false
  });
  newProductCategory.save().then(
    success => {
      res.send(success);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.get('/categories/product', (req, res) => {
  CategoryProduct.find({}).then(
    categories => {
      res.send(categories);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

module.exports = router;
