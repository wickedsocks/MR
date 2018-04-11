// import { Router } from "express";
const {Router} = require('express');

const product = require('./product');
const category = require('./category');
const order = require('./order');

const router = Router();

// Product routes
router.use(product);

// Category routes
router.use(category);

// Order routes
router.use(order);

module.exports = router;
