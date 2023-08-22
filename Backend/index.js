const express = require("express");
const cors = require("cors");
const router = require("./routes/products.routes");
const connect = require("./config/db");
const server = express();
server.use(express.json());
server.use(cors());
server.use("/mern", router);
require("dotenv").config();
port = process.env.PORT;

server.listen(port, () => {
  console.log("Server listening on port" + port);
  connect()
});
