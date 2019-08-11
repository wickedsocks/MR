const mongoose = require('mongoose');

let categoryShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  used: {
    type: Boolean
  },
  subCategories: {
    type: [String]
  },
  parentCategory: {
    type: String
  },
  url_updated: {
    type: Boolean
  }
});

function categoryURLNaming(categoryName) {
  return categoryName.toLowerCase().trim().split(' ').join('_');
}

categoryShema.statics.categoryURLNaming = categoryURLNaming;

const CategoryManufacture = mongoose.model("categories_manufactures", categoryShema);
const CategoryProduct = mongoose.model('categories_products', categoryShema);
const Category = mongoose.model('categories', categoryShema);

module.exports = {
  CategoryManufacture,
  CategoryProduct,
  Category
}