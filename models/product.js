const getDb = require("../utils/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbTemp;
    if (this._id) {
      dbTemp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbTemp = db.collection("products").insertOne(this);
    }

    return dbTemp
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch();
  }
}

module.exports = Product;
