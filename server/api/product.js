require('../../dbconfig/config');
const {
  Router
} = require('express');
const {
  Product
} = require("../../models/product");
const formidable = require("formidable");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
});

const router = Router();

router.post("/products", (req, res) => {
  let newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
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
    res.send(err);
  });
})

router.post("/products/upload-image", (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.status(400).send(err);
    }
    cloudinary.v2.uploader.upload(files.file.path, {
      public_id: fields.name
    }, function (err, result) {
      res.send(result);
    });
  });
});

module.exports = router;