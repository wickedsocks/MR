const mongoose = require('mongoose');
const cyrillicToTranslit = require('cyrillic-to-translit-js');

// Creation and validation for database entity
let schema = new mongoose.Schema({
  images: {
    type: Array,
    required: true
  },
  created_at: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  color: [
    {
      type: String,
      required: true
    }
  ],
  productProperties: [
    {
      price: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      }
    }
  ],
  categories: {
    type: [String],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  mykeywords: {
    type: String,
    required: true
  },
  canonicalUrl: {
    type: String
  },
  redirect_url: {
    type: String
  }
  // TODO: need add enity canonicalUrl
});
schema.index({ title: 1 });

function productUrlNaming(productName) {
  let trimmedName =  productName.toLowerCase().trim().replace(',', '');
  return cyrillicToTranslit().transform(`${trimmedName}`, "_");
}
function removeUnnecessaryCharacters(string) {
  return string.trim().replace(',', '').replace('.', '');
}
schema.statics.productUrlNaming = productUrlNaming;
schema.statics.removeUnnecessaryCharacters = removeUnnecessaryCharacters;

const Product = mongoose.model('Product', schema);
const Product_copy = mongoose.model('product_copy', schema);

module.exports = {
  Product,
  Product_copy
};
