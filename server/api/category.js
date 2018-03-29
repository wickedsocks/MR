require("../../dbconfig/config");

const { Router } = require("express");
const { CategoryManufacture } = require("../../models/category");

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

module.exports = router;
