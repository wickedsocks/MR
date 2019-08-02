require('../../dbconfig/config');
const { Router } = require('express');
const { Product, Product_copy } = require('../../models/product');
const { Category } = require('../../models/category');
const { authenticate, isAdmin } = require('./middleware/middleware.service');
const formidable = require('formidable');
const { ObjectId } = require('mongoose').Types;

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
});

const router = Router();

router.post('/update/categories', (req, res) => {
  let id = req.body.id;
  Product.findByIdAndUpdate(id, {
    $set: { categories: req.body.categories }
  }).then(
    success => {
      res.send(`Category ${success} has updated`);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.post('/products', authenticate, isAdmin, (req, res) => {
  let promiseCategories = [];
  let newProduct = new Product({
    color: req.body.colorArray.map(item => item.toLowerCase()),
    productProperties: req.body.productProperties,
    description: req.body.description,
    title: req.body.title.trim(),
    images: req.body.images,
    categories: req.body.categories,
    mykeywords: req.body.mykeywords,
    canonicalUrl: req.body.canonicalUrl ? req.body.canonicalUrl : '',
    url: Product.productUrlNaming(req.body.title)
  });
  newProduct.created_at = new Date(ObjectId(newProduct._id).getTimestamp()).getTime();
  req.body.categories.forEach(id => {
    promiseCategories.push(
      Category.findByIdAndUpdate(id, { $set: { used: true } })
    );
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

router.get('/products', (req, res) => {
  let productsArray = [];
  Product.find({}).then(
    products => {
      products.forEach((product) => {
        Product_copy.find({_id: product._id})
        .then((prod_copy) => {
          product.redirect_url = prod_copy.url;
          let localProduct = new Product(product);
          productsArray.push(localProduct.save());
        });
      });
      Promise.all(productsArray).then((success) => {
        res.send(products);
      }, (err) => {
        res.status(400).send(err);  
      });
      // res.send(products);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.post('/pagination/products', async (req, res) => {
  let { skip, limit } = req.body;
  let count;
  try {
    count = await Product.count();
  } catch (error) {
    res.status(400).send(error);
  }
  Product.find({})
    .skip(skip)
    .limit(limit)
    .then(
      success => {
        success = success.map(item => {
          item.created_at = new Date(ObjectId(item._id).getTimestamp()).getTime();
          return item;
        });
        res.send({ count, products: success });
      },
      err => {
        res.status(400).send(err);
      }
    );
});

router.get('/products/search', (req, res) => {
  Product.find({
    title: {
      $regex: `${req.query.title}.*`,
      $options: 'i'
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

router.get('/category/products', async (req, res) => {
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

router.post('/products/upload-image', authenticate, isAdmin, (req, res) => {
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
        quality: 'auto'
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

router.post('/products/update', authenticate, isAdmin, (req, res) => {
  Product.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        categories: req.body.categories,
        color: req.body.color,
        description: req.body.description,
        images: req.body.images,
        productProperties: req.body.productProperties,
        title: req.body.title,
        url: req.body.url,
        mykeywords: req.body.mykeywords,
        canonicalUrl: req.body.canonicalUrl ? req.body.canonicalUrl : ''
      }
    },
    {
      new: true
    }
  ).then(
    success => {
      res.send(success);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.get('/product', (req, res) => {
  const { url, redirect_url } = req.query;
  if (url) {
    Product.find({
      url
    }).then(
      products => {
        console.log('products ', products);
        if (products.length === 0) {
          res.status(400).send('No items with such url');  
        }
        res.send(products);
      },
      err => {
        res.status(400).send(err);
      }
    ); 
  } else if (redirect_url) {
    Product.find({
      redirect_url
    }).then(
      products => {
        if (products.length === 0) {
          res.status(400).send('No items with such redirect_url');   
        }
        res.send(products);
      },
      err => {
        res.status(400).send(err);
      }
    );
  }
});
module.exports = router;
