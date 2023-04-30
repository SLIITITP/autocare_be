const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  service: "Gmail",
  auth: {
    user: `test1234emailforproject@gmail.com`,
    pass: `lezlyyvxepbltwih`,
  },
});

async function SendEmail(emailObject) {
  if (emailObject) {
    let info = await transporter.sendMail({
      from: "AutoCare Pvt Ltd",
      to: emailObject.receiverEmail,
      subject: emailObject.emailSubject,
      text: emailObject.emailTextBody,
      html: emailObject.emailHtmlBody,
    });
    console.log("Message sent: %s", info.messageId);
  }
}

SendEmail().catch(console.error);

module.exports = SendEmail;
