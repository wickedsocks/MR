const { Product } = require("../../models/product");
const {
  CategoryManufacture,
  CategoryProduct
} = require("../../models/category");

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

const categoriesManufacture = [
  {
    description: "req.body.description 1",
    name: "req.body.name 1"
  },
  {
    description: "req.body.description 2",
    name: "req.body.name 2",
  }
];

const categoriesProduct = [
  {
    name: "Man faces"
  },
  {
    name: "Women faces"
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

const populateCategoriesManufacture = (done) => {
  CategoryManufacture.remove({})
    .then(() => {
      let catOne = new CategoryManufacture(categoriesManufacture[0]).save();
      let catTwo = new CategoryManufacture(categoriesManufacture[1]).save();

      return Promise.all([catOne, catTwo]);
    })
    .then(() => done());
};

const populateCategoryProducts = (done) => {
  CategoryProduct.remove({}).then(() => {
    let prodCatOne = new CategoryProduct(categoriesProduct[0]).save();
    let prodCatTwo = new CategoryProduct(categoriesProduct[1]).save();

    return Promise.all([prodCatOne, prodCatTwo]);
  })
  .then(() => done());
};

module.exports = {
  products,
  populateProducts,
  categoriesManufacture,
  populateCategoriesManufacture,
  categoriesProduct,
  populateCategoryProducts
};
