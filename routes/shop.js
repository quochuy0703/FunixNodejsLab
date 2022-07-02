const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const Router = express.Router();

const adminData = require("./admin");

Router.get("/", (req, res, next) => {
  console.log("shop.js", adminData.products);
  res.render("shop");
});

module.exports = Router;
