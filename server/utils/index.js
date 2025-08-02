const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const checkPermissions = require("./checkPermissions");
const createTokenUser = require("./createTokenUser");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
