require("../../dbconfig/config");
const { Router } = require("express");
const { Product } = require("../../models/product");
const {
  Category
} = require("../../models/category");
const { authenticate, isAdmin } = require("./middleware/middleware.service");
const formidable = require("formidable");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
});

const router = Router();

router.post("/update/categories", (req, res) => {
  let id = req.body.id;
  Product.findByIdAndUpdate(id, {
    $set: {categories: req.body.categories}
  }).then((success) => {
   res.send(`Category ${success} has updated`);
  }, (err) => {
   res.status(400).send(err);
  })
});

router.post("/products", authenticate, isAdmin, (req, res) => {
  let promiseCategories = [];
  let newProduct = new Product({
    color: req.body.colorArray.map(item => item.toLowerCase()),
    productProperties: req.body.productProperties,
    description: req.body.description,
    title: req.body.title.trim(),
    images: req.body.images,
    categories: req.body.categories,
    url: Product.productUrlNaming(req.body.title)
  });
  req.body.categories.forEach((id) => {
    promiseCategories.push(Category.findByIdAndUpdate(id, {$set: {used: true}}));
  });
  Promise.all(promiseCategories).then(
    () => {
      newProduct.save().then(
        success => {
          res.send(success);
        },
        err => {
          res.status(400).send(err);
        }
      );
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.get("/products", (req, res) => {
  Product.find({}).then(
    products => {
      res.send(products);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.get("/products/search", (req, res) => {
  Product.find({
    title: {
      $regex: `${req.query.title}.*`,
      $options: "i"
    }
  }).then(
    products => {
      res.send(products);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.get("/category/products", async (req, res) => {
  let categoryFound = await Category.find({
    url: req.query.url
  });
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
  form.parse(req, async function(err, fields, files) {
    if (err) {
      res.status(400).send(err);
    }
      cloudinary.v2.uploader.upload(
        files.file.path,
        {
          public_id: Product.productUrlNaming(fields.name),
          width: 600,
          quality: "auto"
        },
        function(err, result) {
          if (err) {
            res.status(400).send(err);
          }
          res.send(result);
        }
      ); 
  });
});
module.exports = router;
