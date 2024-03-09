const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

const sendEmail = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}



module.exports = {
    sendEmail: sendEmail
}


