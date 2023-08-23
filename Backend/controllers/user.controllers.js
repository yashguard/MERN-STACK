const catchAsyncError = require("../middleware/catchAsyncErrors");
const user = require("../models/userSchema");
const ErrorHandler = require("../utils/errorhandler");

const registerUser = catchAsyncError(async (req, res) => {
  let { name, email, password } = req.body;

  const user = await user.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is my sample id",
      url: "ProfilePicUrl",
    },
  });

  res.status(201).json({
    success: true,
    user,
  });
});
