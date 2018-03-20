const supertest = require("supertest");
const { app } = require("../server/server");
const expect = require("chai").expect;
const { products, populateProducts } = require("./seed/seed");

beforeEach(populateProducts);

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