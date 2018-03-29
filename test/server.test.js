const supertest = require("supertest");
const { app } = require("../server/server");
const expect = require("chai").expect;
const { products, populateProducts, categories, populateCategories } = require("./seed/seed");

beforeEach(populateProducts);
beforeEach(populateCategories);

describe("GET /api/products", () => {
  it("should return all products", (done) => {
    supertest(app)
      .get("/api/products")
      .expect(200)
      .expect((res) => {
        expect(res.body[0].title).to.be.equal(products[0].title);
        expect(res.body[0].price).to.be.equal(products[0].price);
        expect(res.body[1].title).to.be.equal(products[1].title);
        expect(res.body[1].price).to.be.equal(products[1].price);
      })
      .end(done);
  });
});


describe("POST /api/products", () => {
  it("should return posted product", (done) => {
    let title = 'Title';
    let description = 'Description';
    let price = 1234;
    let currency = 'UAH';
    supertest(app)
      .post("/api/products")
      .send({
        title,
        description,
        price,
        currency
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.title).to.be.equal(title);
        expect(res.body.price).to.be.equal(price);
        expect(res.body.description).to.be.equal(description);
        expect(res.body.currency).to.be.equal(currency);
      })
      .end(done);
  });
});

describe('POST /api/categories', () => {
  it('should create new category instance', (done) => {
    let category = {
      description: 'req.body.description test',
      name: 'req.body.name test',
      seoUrl: 'req.body.seoUrl test',
      headingTitle: "req.body.headingTitle test",
      seoTitle: 'req.body.seoTitle test',
      categoriesId: '1',
      seoDescription: 'req.body.seoDescription test',
      languageId: 'req.body.languageId test',
      seKeywords: 'req.body.seKeywords test'
    };
    supertest(app)
    .post('/api/categories')
    .send(category)
    .expect(200)
    .expect((res) => {
      expect(res.body.categoriesDescription).to.be.equal(category.description);
      expect(res.body.categoriesName).to.be.equal(category.name);
      expect(res.body.categoriesSeoTitle).to.be.equal(category.seoTitle);
    })
    .end(done);
  })
});

describe("GET /api/categories", () => {
  it('should return categories list', (done) => {
    supertest(app)
    .get('/api/categories')
    .expect(200)
    .expect((res) => {
      expect(res.body[0].categoriesDescription).to.be.equal(categories[0].categoriesDescription);
      expect(res.body[0].categoriesName).to.be.equal(categories[0].categoriesName);
      expect(res.body[1].categoriesDescription).to.be.equal(categories[1].categoriesDescription);
      expect(res.body[1].categoriesName).to.be.equal(categories[1].categoriesName);
    })
    .end(done);
  });
})