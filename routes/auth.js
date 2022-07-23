const express = require("express");

const Router = express.Router();

const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

Router.get("/login", authController.getLogin);
Router.post("/login", authController.postLogin);
Router.get("/signup", authController.getSigup);
Router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This email address if forbidden");
        }
        return true;
      }),
    body(
      "password",
      "plase enter a password only number and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postSignup
);
Router.post("/logout", authController.postLogout);

module.exports = Router;
