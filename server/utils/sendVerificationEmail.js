const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking this link: <a href="${verifyEmail}">Click here</a></p>`;
  return sendEmail({
    to: email,
    subject: "Email verification",
    html: `<h4>Hello, ${name}</h4> ${message}`,
  });
};

module.exports = sendVerificationEmail;
