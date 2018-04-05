const supertest = require("supertest");
const { app } = require("../server/server");
const expect = require("chai").expect;
const {
  products,
  populateProducts,
  categoriesManufacture,
  populateCategoriesManufacture,
  categoriesProduct,
  populateCategoryProducts
} = require("./seed/seed");

beforeEach(populateProducts);
beforeEach(populateCategoriesManufacture);
beforeEach(populateCategoryProducts);

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
    let title = "Title";
    let description = "Description";
    let price = 1234;
    let currency = "UAH";
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

describe("POST /api/categories/manufacture", () => {
  it("should create new category manufacture instance", (done) => {
    let category = {
      description: "req.body.description test",
      name: "req.body.name test",
    };
    supertest(app)
      .post("/api/categories/manufacture")
      .send(category)
      .expect(200)
      .expect((res) => {
        expect(res.body.description).to.be.equal(
          category.description
        );
        expect(res.body.name).to.be.equal(category.name);
      })
      .end(done);
  });
});

describe("GET /api/categories/manufacture", () => {
  it("should return categories manufacture list", (done) => {
    supertest(app)
      .get("/api/categories/manufacture")
      .expect(200)
      .expect((res) => {
        expect(res.body[0].description).to.be.equal(
          categoriesManufacture[0].description
        );
        expect(res.body[0].name).to.be.equal(
          categoriesManufacture[0].name
        );
        expect(res.body[1].description).to.be.equal(
          categoriesManufacture[1].description
        );
        expect(res.body[1].name).to.be.equal(
          categoriesManufacture[1].name
        );
      })
      .end(done);
  });
});

describe('POST /api/categories/product', () => {
  it('should create new product category ', (done) => {
    supertest(app)
    .post('/api/categories/product')
    .send(categoriesProduct[0])
    .expect(200)
    .expect((res) => {
      expect(res.body.name).to.be.equal(categoriesProduct[0].name);
    })
    .end(done);
  })
});

describe('GET /api/categories/product', () => {
  it('should return all product categories', (done) => {
    supertest(app)
    .get('/api/categories/product')
    .expect(200)
    .expect((res) => {
      expect(res.body[0].name).to.be.equal(categoriesProduct[0].name);
      expect(res.body[1].name).to.be.equal(categoriesProduct[1].name);
    })
    .end(done);
  })
});