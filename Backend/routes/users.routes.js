const { Router } = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/user.controllers");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

module.exports = userRouter;
