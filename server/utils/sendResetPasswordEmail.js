const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetLink = `${origin}/reset-password?token=${token}&email=${email}`;
  console.log("HEllo", resetLink);

  const message = `
  <p>Please click this link to reset password: 
    <a href="${resetLink}" target="_blank" rel="noopener noreferrer">
      Reset Password
    </a>
  </p>
`;
  return sendEmail({
    to: email,
    subject: "Reset password",
    html: `<h4>Hello, ${name}</h4> ${message}`,
  });
};

module.exports = sendResetPasswordEmail;
