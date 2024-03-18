const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      status: "Success",
      data: { newUser, token },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(errorHandler(400, "All fields are required"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(errorHandler(404, "User not found"));
    }
    const token = signToken(user.id);
    try {
      await User.updateOne({ _id: user._id }, { accessToken: token });
    } catch (err) {
      console.log(err.message);
    }
    res.status(200).json({
      status: "success",
      message: "user is updated",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    next(err.message);
  }
};

exports.logout = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user.id }, { accessToken: "" });
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "user is updated",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "user is deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new Error("User not authenticated");
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error("User doesn't exist");
    }
    if (currentUser.accessToken != token) {
      throw new Error("User isn't logged in");
    }
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new Error("user changed password");
    }
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
