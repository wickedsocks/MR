const { Product } = require("../../models/product");
const {
  CategoryManufacture,
  CategoryProduct
} = require("../../models/category");
const { Order } = require("../../models/order");

const products = [
  {
    title: "Product 1",
    description: "Best product",
    price: 3333,
    manufactureCategory: "manu fact 1",
    productCategory: "prod cat 1",
    images: ["a", "b", "c"],
    width: 14,
    height: 25
  },
  {
    title: "Product 2",
    description: "Best product 2",
    price: 8383,
    manufactureCategory: "manu fact 2",
    productCategory: "prod cat 2",
    images: ["a 2", "b 2", "c 2"],
    width: 55,
    height: 74
  }
];

const categoriesManufacture = [
  {
    description: "req.body.description 1",
    name: "req.body.name 1"
  },
  {
    description: "req.body.description 2",
    name: "req.body.name 2"
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

const orders = [
  {
    name: "first order",
    email: "first email",
    tel: 1241241,
    comment: "Самый злостный комментарий"
  },
  {
    name: "second order",
    email: "second email",
    tel: 888000999,
    comment: "Самый позитивный комментарий комментарий"
  }
];

const populateOrders = (done) => {
  Order.remove({})
    .then(() => {
      return Promise.all([
        new Order(orders[0]).save(),
        new Order(orders[1]).save()
      ]);
    })
    .then(() => done());
};

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
  CategoryProduct.remove({})
    .then(() => {
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
  populateCategoryProducts,
  orders,
  populateOrders
};
