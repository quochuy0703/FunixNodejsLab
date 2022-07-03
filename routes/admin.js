const path = require("path");

const express = require("express");

const Router = express.Router();

const adminController = require("../controllers/admin");

Router.get("/add-product", adminController.getAddProducts);

Router.get("/products", adminController.getProducts);

Router.post("/add-product", adminController.postAddProducts);

module.exports = Router;
