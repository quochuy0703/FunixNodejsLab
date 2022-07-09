const getDb = require("../utils/database").getDb;

const mongodb = require("mongodb");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("user").insertOne(this);
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("user")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next();
  }
}
