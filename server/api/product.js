require('../../dbconfig/config');
const {
  Router
} = require('express');
const {
  Product
} = require("../../models/product");
const {
  CategoryProduct,
  CategoryManufacture
} = require('../../models/category');
const {
  authenticate,
  isAdmin
} = require('./middleware/middleware.service');
const formidable = require("formidable");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
});

const router = Router();

router.post("/products", authenticate, isAdmin, (req, res) => {
  let newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
    color: req.body.color,
    width: req.body.width,
    height: req.body.height,
    productCategory: req.body.productCategory,
    manufactureCategory: req.body.manufactureCategory,
    price: req.body.price
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
  Product.find({}).then(
    (products) => {
      res.send(products);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.get("/products/search", (req, res) => {
  Product.find({
    title: {
      $regex: `${req.query.title}.*`,
      $options: 'i'
    }
  }).then((products) => {

    res.send(products);
  }, (err) => {
    res.status(400).send(err);
  });
});

router.get('/category/products', async (req, res) => {
  let categoryFound;
  // request prod cat
  categoryFound = await CategoryProduct.find({
    url: req.query.url
  });
  // if not found request manufacture cat
  if (categoryFound && categoryFound.length == 0) {
    categoryFound = await CategoryManufacture.find({
      url: req.query.url
    });
  }
  // then try to get products with category
  try {
    let products = await Product.find({
      categories: categoryFound[0]._id
    });
    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/products/upload-image", authenticate, isAdmin, (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.status(400).send(err);
    }
    cloudinary.v2.uploader.upload(files.file.path, {
      public_id: fields.name
    }, function (err, result) {
      if (err) {
        res.status(400).send(err);
      }
      res.send(result);
    });
  });
});

router.get('/products/:category', (req, res) => {
  console.log('category r ', req.query.title);
  Product.find({
    productCategory: req.params.category
  }).then((products) => {
    res.send(products);
  }, (err) => {
    res.status(400).send(err);
  })
});

module.exports = router;