// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

const express = require("express");
const cors = require("cors");
const router = require("./routes/products.routes");
const connect = require("./config/db");
const errorFunction = require("./middleware/error");
const server = express();
server.use(express.json());
server.use(cors());
server.use("/mern", router);
server.use(errorFunction);
require("dotenv").config();
port = process.env.PORT;

const app = server.listen(port, () => {
  console.log("Server listening on port" + port);
  connect();
});

// Unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandle promise rejection");

  app.close(() => {
    process.exit(1);
  });
});
