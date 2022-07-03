const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const Router = express.Router();

const adminData = require("./admin");

Router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "shop",
    path: "/",
    hasProducts: products.length > 0,
  });
});

module.exports = Router;
