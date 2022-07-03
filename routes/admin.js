const path = require("path");

const express = require("express");

const Router = express.Router();

const productsController = require("../controllers/products");

const { Module } = require("module");

Router.get("/add-product", productsController.getAddProducts);

Router.post("/add-product", productsController.postAddProducts);

module.exports = Router;
