const { Product } = require("../../models/product");

const products = [
  {
    title: "Product 1",
    description: "Best product",
    price: 3333,
    currency: "UAH"
  },
  {
    title: "Product 2",
    description: "Second best product",
    price: 8888,
    currency: "USD"
  }
];

const populateProducts = (done) => {
  Product.remove({})
    .then(() => {
      let productOne = new Product(products[0]).save();
      let productTwo = new Product(products[1]).save();

      return Promise.all([productOne, productTwo]);
    })
    .then(() => done());
};

module.exports = {
  products, populateProducts
};