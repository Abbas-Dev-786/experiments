const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) =>
  jwt.sign({ id }, "verydangerousSecret", { expiresIn: "1d" });

const createAndSendToken = (user, res) => {
  const token = signToken(user._id);

  user.password = undefined;
  user.isActive = undefined;

  res.status(200).json({ status: "success", data: { user, token } });
};

module.exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  user.password = undefined;
  user.isActive = undefined;
  user.updatedAt = undefined;

  res.status(201).json({ status: "success", data: user });
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("email and passwords are required", 400));
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError("invalid credentials", 400));
  }

  if (!user.isActive) {
    return next(new AppError("user does not exists", 404));
  }

  createAndSendToken(user, res);
});

module.exports.test = catchAsync((req, res, next) => {
  createAndSendToken(req.user, res);
});
