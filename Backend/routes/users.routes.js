const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/user.controllers");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/password/reset", forgetPassword);
userRouter.patch("/password/reset/:token", resetPassword);

module.exports = userRouter;
