const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const errorControllers = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62c9a9ee835e1e681de51f58")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("/", errorControllers.get404);

mongoose
  .connect(
    "mongodb+srv://huymq:huymq123456@cluster0-gm4fb.mongodb.net/shop?retryWrites=true&w=majority"
  )
  // .then((result) => {

  //   const user = new User({
  //     name: "Max",
  //     email: "test@gmail.com",
  //     cart: { items: [] },
  //   });
  //   return user.save();
  // })
  .then((result) => {
    console.log("connect database");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
