// required this file to inject default config for nodeJS app
require("../dbconfig/config");
const bodyParser = require('body-parser');

// required for providing mongoDB connection
require('../db/mongoose');

import express from "express";
import { Nuxt, Builder } from "nuxt";

import api from "./api/api";

const app = express();

// body-parser needed to parse req.body object in your node  app
app.use(bodyParser.json());

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.set("port", port);

// Import API Routes
app.use("/api", api);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log("Server listening on " + host + ":" + port); // eslint-disable-line no-console

module.exports = {
  app
}
