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
  CategoryManufacture.collection.count({}).then((length) => {
    let newCategory = new CategoryManufacture({
      description: req.body.description,
      name: req.body.name.trim(),
      url: CategoryManufacture.categoryURLNaming(req.body.name.trim())
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
  CategoryManufacture.find({}).then(
    (categories) => {
      res.send(categories);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.post("/categories/product", (req, res) => {
  let newProductCategory = new CategoryProduct({
    description: req.body.description,
    name: req.body.name.trim(),
    url: CategoryProduct.categoryURLNaming(req.body.name.trim())
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
  CategoryProduct.find({}).then((categories) => {
    res.send(categories);
  }, (err) => {
    res.status(400).send(err);
  })
});

module.exports = router;