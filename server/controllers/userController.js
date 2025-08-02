const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user });
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError.NotFoundError({ msg: "No user found with thy id" });
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findById({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.NotFoundError({ msg: "No user found with thy id" });
  }
  if (!password) {
    throw new CustomError.UnauthenticatedError("Please provide your password");
  }
  const verifyPassword = await user.comparePassword(password);
  if (!verifyPassword) {
    throw new CustomError.UnauthenticatedError("Wrong password");
  }

  user.name = name;

  await user.save();
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Missing something");
  }
  const user = await User.findById(req.user.userId);
  const verifyPassword = await user.comparePassword(oldPassword);
  if (!verifyPassword) {
    throw new CustomError.UnauthenticatedError("Incorrect password");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  changePassword,
};
