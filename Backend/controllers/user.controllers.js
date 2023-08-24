const catchAsyncError = require("../middleware/catchAsyncErrors");
const user = require("../models/userSchema");
const ErrorHandler = require("../utils/errorhandler");

const registerUser = catchAsyncError(async (req, res) => {
  let { name, email, password } = req.body;

  const User = await user.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is my sample id",
      url: "ProfilePicUrl",
    },
  });

  const token = User.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
});

const loginUser = catchAsyncError(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or password", 400));
  }

  const User = await user.findOne({ email }).select("+password");

  if (!User) {
    return next(
      new ErrorHandler("Please enter a valid email or password", 401)
    );
  }

  const comparePasssword = await User.comparePasssword(password);

  if (!comparePasssword) {
    return next(
      new ErrorHandler("Please enter a valid email or password", 401)
    );
  }

  const token = User.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
});

module.exports = { registerUser, loginUser };
