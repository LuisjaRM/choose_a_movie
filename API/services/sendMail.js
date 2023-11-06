// Npm requires
const nodemailer = require("nodemailer");
const chalk = require("chalk");

const sendMail = async (to, subject, body, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_FROM,
      pass: process.env.NODEMAILER_KEY,
    },
  });

  try {
    const message = {
      from: process.env.NODEMAILER_FROM,
      to,
      subject,
      text: body,
      html,
    };
    await transporter.sendMail(message);
    console.log(chalk.green("Correo enviado"));
  } catch (error) {
    console.error(chalk.red("No se ha podido enviar el email"), error);
  }
};

module.exports = { sendMail };
