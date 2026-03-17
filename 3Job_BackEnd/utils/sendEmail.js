// utils/sendEmail.js
const nodemailer = require('nodemailer');

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  //config.env check
  if (!host || !user || !pass) {
    throw new Error('SMTP configuration missing. Please check your .env file.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    secure: false, 
    auth: {
      user,pass
    },
    
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });
};

/**
 * sendEmail({ email, subject, message, html })
 */
module.exports = async function sendEmail({ email, subject, message, html }) {
  if (!email) throw new Error('sendEmail: "email" is required');

  const transporter = createTransporter();

  const mailOptions = {
  
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: email,
    subject: subject || '(no subject)',
    text: message || '',
    html: html || (message ? message.toString().replace(/\n/g, '<br/>') : '')
  };

  try {
    
    //await transporter.verify();
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Email Error:", error.message);
    throw error; 
  }
};