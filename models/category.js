const mongoose = require('mongoose');

let manufactureCategory = new mongoose.Schema({
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

let procutCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const CategoryManufacture = mongoose.model("categories_manufacture", manufactureCategory);
const CategoryProduct = mongoose.model('categories_product', procutCategory)

module.exports = {
  CategoryManufacture,
  CategoryProduct
}