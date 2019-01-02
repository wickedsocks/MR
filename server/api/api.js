// import { Router } from "express";
const {Router} = require('express');

const product = require('./product');
const category = require('./category');
const order = require('./order');
const user = require('./user');
const sitemap = require('./sitemap_routes');

const router = Router();

// Product routes
router.use(product);

// Category routes
router.use(category);

// Order routes
router.use(order);

// User routes
router.use(user);

// Sitemap routes
router.use(sitemap);

module.exports = router;
