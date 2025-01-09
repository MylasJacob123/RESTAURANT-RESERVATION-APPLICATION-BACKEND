require("dotenv").config();
const nodemailer = require('nodemailer');

// console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// transporter.verify((error, success) => {
//     if (error) {
//         console.error("SMTP configuration error:", error.message);
//     } else {
//         console.log("SMTP is ready to send emails:", success);
//     }
// });

module.exports = transporter;