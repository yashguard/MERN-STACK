const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
} = require("../controllers/user.controllers");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/password/reset", forgetPassword);

module.exports = userRouter;
