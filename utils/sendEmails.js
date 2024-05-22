import nodemailer from "nodemailer";

const {
  SENDER_EMAIL_ADDRESS,
  SENDER_EMAIL_PASSWORD,
} = process.env;

// send email
export const sendEmail = (to, url, txt, subject, template) => {

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: SENDER_EMAIL_ADDRESS,
      pass: SENDER_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html: template(to, url),
  };

  smtpTransport.sendMail(mailOptions, (err, infos) => {
    if (err) {
      console.log("error mail: ", err);
    } else {
      ``;
      console.log("infos mail: ", infos);
    }
  });
};
