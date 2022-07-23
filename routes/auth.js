const express = require("express");

const Router = express.Router();

const User = require("../models/user");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

Router.get("/login", authController.getLogin);
Router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);
Router.get("/signup", authController.getSigup);
Router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address if forbidden");
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email exists already");
          }
        });
      }),
    body(
      "password",
      "plase enter a password only number and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password have to match.");
      }
      return true;
    }),
  ],
  authController.postSignup
);
Router.post("/logout", authController.postLogout);

module.exports = Router;
