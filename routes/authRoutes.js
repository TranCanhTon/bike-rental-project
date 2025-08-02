const express = require("express");
const router = express.Router();

const {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router
  .post("/login", login)
  .post("/register", register)
  .post("/logout", logout)
  .post("/verify-email", verifyEmail)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword);

module.exports = router;
