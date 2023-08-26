const { Router } = require("express");
const { newOrder } = require("../controllers/order.controller");
const { isAuthenticated } = require("../middleware/authentication");
const orderRouter = Router();

orderRouter.post("/new", isAuthenticated, newOrder);

module.exports = orderRouter;
