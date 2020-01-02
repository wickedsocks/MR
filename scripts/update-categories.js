require("../dbconfig/config");
require("../db/mongoose");
const { CategoryProduct, CategoryManufacture } = require("../models/category");
const { Product } = require("../models/product");

async function findAllProducts() {
  await updateCategories();
  let promiseAll = [];
  let products = await Product.find({});
  products.forEach(item => {
    promiseAll.push(
      CategoryProduct.findByIdAndUpdate(item.productCategory, {
        $set: { used: true }
      })
    );
    promiseAll.push(
      CategoryManufacture.findByIdAndUpdate(item.manufactureCategory, {
        $set: { used: true }
      })
    );
  });

  Promise.all(promiseAll).then(success => {
  });
}

async function updateCategories() {
  let promiseAll = [];
  promiseAll.push(
    await CategoryProduct.updateMany({}, { $set: { used: false } })
  );
  promiseAll.push(
    await CategoryManufacture.updateMany({}, { $set: { used: false } })
  );
  return Promise.all(promiseAll);
}

findAllProducts();
