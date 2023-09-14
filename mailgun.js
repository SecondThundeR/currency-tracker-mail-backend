"use strict";

const formData = require("form-data");
const dotenv = require("dotenv");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

dotenv.config();

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const MAIL_ANSWER =
  "Thank you for reaching out to us! Our representative will contact you as soon as possible! So that you don't forget, here is the message you sent us:\n\n";

module.exports = async (to, subject, text) => {
  try {
    const data = {
      from: "Admin <admin@example.com>",
      to: [to],
      subject: `Contact us: ${subject}`,
      text: `${MAIL_ANSWER}${text}`,
    };
    const message = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return message.status === 200;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to send email");
  }
};
