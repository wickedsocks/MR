require("../../dbconfig/config");

const {
  Router
} = require("express");
const {
  CategoryManufacture,
  CategoryProduct
} = require("../../models/category");

const router = Router();

router.post("/categories/manufacture", (req, res) => {
  let trimmedName = req.body.name.trim();
  CategoryManufacture.collection.count({}).then((length) => {
    let newCategory = new CategoryManufacture({
      description: req.body.description,
      name: trimmedName,
      url: CategoryManufacture.categoryURLNaming(trimmedName)
    });

    newCategory.save().then(
      (success) => {
        res.send(success);
      },
      (err) => {
        res.status(400).send(err);
      }
    );
  });
});

router.get("/categories/manufacture", (req, res) => {
  let categoriesArray = [];
  CategoryManufacture.find({}).then(
    (categories) => {
      categories.forEach((item) => {
        categoriesArray.push(CategoryManufacture.updateMany({url: CategoryManufacture.categoryURLNaming(item.name)}));
      });
      Promise.all(categoriesArray).then(() => {
        res.send(categories);
      });
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.post("/categories/product", (req, res) => {
  let trimmedName = req.body.name.trim();
  let newProductCategory = new CategoryProduct({
    description: req.body.description,
    name: trimmedName,
    url: CategoryProduct.categoryURLNaming(trimmedName)
  });
  newProductCategory.save().then(
    (success) => {
      res.send(success);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.get("/categories/product", (req, res) => {
  let categoriesArray = [];
  CategoryProduct.find({}).then((categories) => {
    categories.forEach((item) => {
      categoriesArray.push(CategoryManufacture.updateMany({url: CategoryManufacture.categoryURLNaming(item.name)}));
    });
    Promise.all(categoriesArray).then(() => {
      res.send(categories);
    });
    res.send(categories);
  }, (err) => {
    res.status(400).send(err);
  })
});

module.exports = router;