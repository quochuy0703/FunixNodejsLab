const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://huymq:huymq123456@cluster0-gm4fb.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connect Database");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
