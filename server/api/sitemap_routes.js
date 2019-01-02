require('../../dbconfig/config');
const { Router } = require('express');
const { Product } = require('../../models/product');
const { Category } = require('../../models/category');

const router = Router();

router.post('/generate-sitemap', (req, res) => {
  const { product, category } = req.body;
  const promiseAll = [];
  const dateISO = new Date().toISOString();
  promiseAll.push(Product.find({}));
  promiseAll.push(Category.find({}));
  const initialRoute = {url: '/', priority: 1, lastmodISO: dateISO };
  Promise.all(promiseAll).then(
    result => {
      let products = result[0];
      let categories = result[1];
      let productSitemap = products.map(item => {
        return {
          url: `${product}/${item.url}`,
          changefreq: 'daily',
          priority: 0.6,
          lastmodISO: dateISO
        };
      });
      productSitemap.push(initialRoute);
      let categorySitemap = categories.map(item => {
        return {
          url: `${category}/${item.url}`,
          changefreq: 'daily',
          priority: 0.8,
          lastmodISO: dateISO
        };
      });
      let concatedSitemap = productSitemap.concat(categorySitemap);
      res.json(concatedSitemap);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

module.exports = router;
