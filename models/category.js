const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  categoriesDescription: {
    type: String,
    required: true
  },
  categoriesName: {
    type: String,
    required: true
  },
  categoriesSeoUrl: {
    type: String,
    required: true
  },
  categoriesHeadingTitle: {
    type: String,
    required: true
  },
  categoriesSeoTitle: {
    type: String,
    required: true
  },
  categoriesId: {
    type: String,
    required: true
  },
  categoriesSeoDescription: {
    type: String,
    required: true
  },
  languageId: {
    type: String,
    required: true
  },
  categoriesSeoKeywords: {
    type: String,
    required: true
  },
});

const CategoryManufacture = mongoose.model("category_manufacture", schema);

module.exports = {
  CategoryManufacture
}