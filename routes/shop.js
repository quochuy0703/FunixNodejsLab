const express = require("express");

const shopController = require("../controllers/shop");

const Router = express.Router();
const isAuth = require("../middleware/is-auth");

Router.get("/", shopController.getIndex);

Router.get("/products", shopController.getProducts);
Router.get("/products/:productId", shopController.getProduct);
Router.get("/cart", isAuth, shopController.getCart);
Router.post("/cart", isAuth, shopController.postCart);
Router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);
Router.get("/orders", isAuth, shopController.getOrders);
Router.post("/create-order", isAuth, shopController.postOrder);
// Router.get("/checkout", shopController.getCheckout);

module.exports = Router;
