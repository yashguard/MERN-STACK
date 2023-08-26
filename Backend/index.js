// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const productRouter = require("./routes/products.routes");
const userRouter = require("./routes/users.routes");
const connect = require("./config/db");
const errorFunction = require("./middleware/error");
const orderRouter = require("./routes/order.routes");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors());
server.use("/products", productRouter);
server.use("/user", userRouter);
server.use("/orders", orderRouter);
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
