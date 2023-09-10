import dotenv from 'dotenv';
import mailgun from 'mailgun-js';

dotenv.config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const MAIL_ANSWER =
  "Thank you for reaching out to us! Our representative will contact you as soon as possible! So that you don't forget, here is the message you sent us:\n\n";

export const sendEmail = async (to, subject, text) => {
  try {
    const data = {
      from: "Admin <admin@example.com>",
      to,
      subject: `Contact us: ${subject}`,
      text: `${MAIL_ANSWER}${text}`,
    };
    await mg.messages().send(data);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to send email');
  }
};
