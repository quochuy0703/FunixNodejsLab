const getDb = require("../utils/database").getDb;

const mongodb = require("mongodb");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const updatedCart = {
      items: [{ productId: new mongodb.ObjectId(product._id), quatity: 1 }],
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next();
  }
}

module.exports = User;
