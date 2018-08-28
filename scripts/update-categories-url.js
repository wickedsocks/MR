require('../dbconfig/config');
require('../db/mongoose');
const convert = require('cyrillic-to-latin');
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
    resultArray.push(CategoryProduct.findOneAndUpdate(
      { _id: category._id },
      { $set: { url: `${convert(category.url)}_${category._id}`} }
    ));
  });
  manufacture.forEach(category => {
    resultArray.push(CategoryManufacture.findOneAndUpdate(
      { _id: category._id },
      { $set: { url: `${convert(category.url)}_${category._id}`} }
    ));
  });
  const result = await Promise.all(resultArray);
  console.log('result ', result);
}

updateCategories();
