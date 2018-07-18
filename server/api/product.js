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
  const promiseArray = [];
  Product.find({}).then(
    (products) => {
      products.forEach((item) => {
        let categories = [];
        categories.push(item.productCategory);
        categories.push(item.manufactureCategory);
        promiseArray.push(Product.updateMany({title: item.title}, {categories}));
      });
      Promise.all(promiseArray).then((success) => {
       res.send(success);
      });
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.get('/products/:category', (req, res) => {
  console.log('req ', req.params.category);
 Product.find({productCategory: req.params.category}).then((products) => {
  res.send(products);
 }, (err) => {
  res.status(400).send(err);
 })
})

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
      res.status(400).send(result);
    });
  });
});

module.exports = router;