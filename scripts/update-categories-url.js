require('../dbconfig/config');
require('../db/mongoose');
// const convert = require('cyrillic-to-latin');
// FIXME: change convert libruary to valid function
const { CategoryProduct, CategoryManufacture } = require('../models/category');

async function updateCategories() {
  let promiseAll = [];
  promiseAll.push(
    await CategoryProduct.find({})
    // await CategoryProduct.updateMany({}, { $set: { used: false } })
  );
  promiseAll.push(
    await CategoryManufacture.find({})
    // await CategoryManufacture.updateMany({}, { $set: { used: false } })
  );
  const [product, manufacture] = await Promise.all(promiseAll);
  const resultArray = [];
  product.forEach(category => {
    if (!category.url_updated) {
      resultArray.push(CategoryProduct.findOneAndUpdate(
        { _id: category._id },
        { $set: { url: `${convert(category.url)}_${category._id}`, url_updated: true} }
      )); 
    }
  });
  manufacture.forEach(category => {
    if (!category.url_updated) {
    resultArray.push(CategoryManufacture.findOneAndUpdate(
      { _id: category._id },
      { $set: { url: `${convert(category.url)}_${category._id}`, url_updated: true} }
    ));
  }
  });
  const result = await Promise.all(resultArray);
  console.log('result ', result);
}

updateCategories();
