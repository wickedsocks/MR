// import { Router } from "express";
const {Router} = require('express');

const product = require('./product');
const category = require('./category');

const router = Router();

// Product routes
router.use(product);

// Category routes
router.use(category);

module.exports = router;
