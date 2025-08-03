const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils");
const crypto = require("crypto");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid email");
  }

  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) {
    throw new CustomError.UnauthenticatedError("Wrong password");
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Please verify your account");
  }

  const tokenUser = createTokenUser(user);
  const token = createJWT({ payload: tokenUser });
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification failed");
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification failed");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email verified" });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailExisted = await User.findOne({ email });
  if (emailExisted) {
    throw new CustomError.BadRequestError("Email already existssss");
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = "https://bike-rental-project-mas3.onrender.com";

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Success! Check your email to verify account",
  });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5000),
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Invalid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(40).toString("hex");
    const passwordTokenExpirationDate = new Date(Date.now() + 1000 * 60 * 10);
    const origin = "https://bike-rental-project-mas3.onrender.com";

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });
    user.passwordToken = passwordToken;
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link!" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!email || !token || !password) {
    throw new CustomError.BadRequestError("Please provide your information");
  }
  const user = await User.findOne({ email });

  if (user) {
    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;
    await user.save();
  }
};

module.exports = {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
