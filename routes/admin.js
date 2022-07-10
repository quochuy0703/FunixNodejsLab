const path = require("path");

const express = require("express");

const Router = express.Router();

const isAuth = require("../middleware/is-auth");

const adminController = require("../controllers/admin");

Router.get("/add-product", isAuth, adminController.getAddProducts);

Router.get("/products", isAuth, adminController.getProducts);

Router.post("/add-product", isAuth, adminController.postAddProducts);
Router.post("/edit-product", isAuth, adminController.postEditProduct);
Router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
Router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = Router;
