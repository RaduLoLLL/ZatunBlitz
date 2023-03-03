export function transporter() {
  const nodemailer = require("nodemailer")
  const username = process.env.EMAIL_USERNAME
  const password = process.env.EMAIL_PASSWORD
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
  })
  return transporter
}
