require("../../dbconfig/config");

const { Router } = require("express");
const {
  CategoryManufacture,
  CategoryProduct
} = require("../../models/category");

const router = Router();

router.post("/categories/manufacture", (req, res) => {
  CategoryManufacture.collection.count({}).then((length) => {
    let newCategory = new CategoryManufacture({
      categoriesDescription: req.body.description,
      categoriesName: req.body.name,
      categoriesSeoUrl: req.body.seoUrl,
      categoriesHeadingTitle: req.body.headingTitle,
      categoriesSeoTitle: req.body.seoTitle,
      categoriesId: length + 1,
      categoriesSeoDescription: req.body.seoDescription,
      languageId: req.body.languageId,
      categoriesSeoKeywords: req.body.seKeywords
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
    name: req.body.name
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
  },(err) => {
    res.status(400).send(err);
  })
});

module.exports = router;
