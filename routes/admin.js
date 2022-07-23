const path = require("path");

const express = require("express");

const Router = express.Router();

const isAuth = require("../middleware/is-auth");

const adminController = require("../controllers/admin");
const { check, body } = require("express-validator/check");

Router.get("/add-product", isAuth, adminController.getAddProducts);

Router.get("/products", isAuth, adminController.getProducts);

Router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("imageUrl").isURL(),
    body("description").isString().isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postAddProducts
);
Router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("imageUrl").isURL(),
    body("description").isString().isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);
Router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
Router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = Router;
