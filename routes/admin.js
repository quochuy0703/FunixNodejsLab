const path = require("path");

const express = require("express");

const Router = express.Router();

const adminController = require("../controllers/admin");

Router.get("/add-product", adminController.getAddProducts);

Router.get("/products", adminController.getProducts);

Router.post("/add-product", adminController.postAddProducts);
Router.post("/edit-product", adminController.postEditProduct);
Router.get("/edit-product/:productId", adminController.getEditProduct);
Router.post("/delete", adminController.postDeleteProduct);

module.exports = Router;
