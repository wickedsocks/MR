require('../../dbconfig/config');
const { Router } = require('express');
const { authenticate, isAdmin } = require('./middleware/middleware.service');
const {
  CategoryManufacture,
  CategoryProduct,
  Category
} = require('../../models/category');
const { Product } = require('../../models/product');

const router = Router();

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

router.post('/categories',authenticate, isAdmin, (req, res) => {
  let trimmedName = req.body.name.trim();
  let Category = new Category({
    description: req.body.description,
    name: trimmedName,
    url: Product.productUrlNaming(req.body.name),
    used: false
  });
  Category.save().then(
    success => {
      res.send(success);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.get('/categories', (req, res) => {
  Category.find({}).then((categories) => {
    res.send(categories);
  }, (err) => {
    res.status(400).send(err);
  })
});

router.get('/merge-categoires', (req, res) => {
  let promiseAllArray = [];
  promiseAllArray.push(CategoryProduct.find({}));
  // .then(productsCat => {
  // productsCat.forEach((cat) => {
  //  let category = new Category({
  //   description: cat.description,
  //   name: cat.name,
  //   url: cat.url,
  //   used: cat.used
  // });
  //  promiseAllArray.push(category.save());
  // });
  // },
  // err => {
  //   res.status(400).send(err);
  // });
  promiseAllArray.push(CategoryManufacture.find({}));
  // .then(
  // manuCat => {
  // manuCat.forEach((cat) => {
  //  let category = new Category({
  //   description: cat.description,
  //   name: cat.name,
  //   url: cat.url,
  //   used: cat.used
  // });
  //  promiseAllArray.push(category.save());
  // });
  // },
  // err => {
  //   res.status(400).send(err);
  // });
  Promise.all(promiseAllArray).then((success) => {
    const flattenedArray = [];
    success.forEach((categoryArray) => {
      categoryArray.forEach((category) => {
        flattenedArray.push(category);
      });
    });
    res.send(flattenedArray);
  }, (err) => {
    res.status(400).send(err);
  });
});

router.post('/categories/update', authenticate, isAdmin, (req, res) => {
  const { categories } = req.body;
  const categiresPromise = [];
  categories.forEach((cat) => {
    categiresPromise.push(Category.findByIdAndUpdate(cat._id, {
      $set: {
        name: cat.name,
        description: cat.description,
        url: cat.url,
        used: cat.used,
        subCategories: cat.subCategories,
        parentCategory: cat.parentCategory,
        mainCategory: cat.mainCategory
      }
    }, {
        new: true
      }));
  });
  Promise.all(categiresPromise).then((success) => {
    res.send(success);
  }, err => {
    res.status(400).send(err);
  });
});

module.exports = router;
