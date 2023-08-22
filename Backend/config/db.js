const mongoose = require("mongoose");
require("dotenv").config();
let db = process.env.DB;

const connect = async () => {
  await mongoose
    .connect(db)
    .then(() => {
      console.log("Connected to MongoDB Server Successfully");
    })
    .catch(() => {
      console.log("Error connecting to MongoDB Server");
    });
};

module.exports = connect;
