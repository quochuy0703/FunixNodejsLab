const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./utils/database");

const errorControllers = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

db.execute("select * from products").then().catch();

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("/", errorControllers.get404);

app.listen(3000);
