const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Ton Tran <ton@tondevtrai.xyz>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email error:", error.message);
      throw new Error("Failed to send email");
    }

    console.log("Email sent:", data.id);
  } catch (err) {
    console.error("Failed to send:", err.message);
  }
};

module.exports = sendEmail;
