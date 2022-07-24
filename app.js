const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const flash = require("connect-flash");

const csrf = require("csurf");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

const errorControllers = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const mongoose = require("mongoose");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://huymq:huymq123456@cluster0-gm4fb.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const store = new mongoDBStore({ uri: MONGODB_URI, collection: "sessions" });
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimytype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  req.csrfToken = res.locals.csrfToken;

  next();
});

app.use((req, res, next) => {
  // throw new Error("DUmmy");
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      // throw new Error("DUmmy");
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use("/500", errorControllers.get500);
app.use("/", errorControllers.get404);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render("500", {
    pageTitle: "Error",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI)
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
