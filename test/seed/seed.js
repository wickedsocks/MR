const { Product } = require("../../models/product");
const { Category } = require("../../models/category");

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

const categories = [
  {
    categoriesDescription: 'req.body.description 1',
    categoriesName: 'req.body.name 1',
    categoriesSeoUrl: 'req.body.seoUrl 1',
    categoriesHeadingTitle: "req.body.headingTitle 1",
    categoriesSeoTitle: 'req.body.seoTitle 1',
    categoriesId: '1',
    categoriesSeoDescription: 'req.body.seoDescription 1',
    languageId: 'req.body.languageId 1',
    categoriesSeoKeywords: 'req.body.seKeywords 1'
  },
  {
    categoriesDescription: 'req.body.description 2',
    categoriesName: 'req.body.name 2',
    categoriesSeoUrl: 'req.body.seoUrl 2',
    categoriesHeadingTitle: "req.body.headingTitle 2",
    categoriesSeoTitle: 'req.body.seoTitle 2',
    categoriesId: '2',
    categoriesSeoDescription: 'req.body.seoDescription 2',
    languageId: 'req.body.languageId 2',
    categoriesSeoKeywords: 'req.body.seKeywords 2'
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

const populateCategories = (done) => {
  Category.remove({})
  .then(() => {
    let catOne = new Category(categories[0]).save();
    let catTwo = new Category(categories[1]).save();

    return Promise.all([catOne, catTwo]);
  })
  .then(() => done());
}

module.exports = {
  products,
  populateProducts,
  categories,
  populateCategories
};
