import { Router } from "express";
import { Product } from "../../models/product";
const formidable = require("formidable");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "pavelmykhailovmrjs",
  api_key: "345334832129142",
  api_secret: "9dpzvcXoeQnNRViWdz-3Sa9u_SU"
});

const router = Router();

router.post("/products", (req, res) => {
  let newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    currency: req.body.currency
  });
  newProduct.save().then(
    (success) => {
      res.send(success);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.get("/products", (req, res) => {
  Product.find({}).then(
    (products) => {
      res.send(products);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.post("/products/upload", (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    cloudinary.v2.uploader.upload(files.file.path, {public_id: files.file.name}, function(err, result) {
      res.send(result);
    });
  });
});

export default router;
