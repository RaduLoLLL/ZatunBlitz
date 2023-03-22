export function contactMailer(data: any) {
  // In production, set APP_ORIGIN to your production server origin

  const nodemailer = require("nodemailer")
  const username = process.env.CONTACT_EMAIL
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
  console.log("Trasnporter", transporter)

  const msg = {
    from: "contact@baltazatun.ro",
    to: "secretariat@spjadppgalati.ro",
    subject: "Mesaj nou de pe pagina de contact",
    html: `
      <h1>Nume: ${data.nume}</h1>
      <h1>Prenume: ${data.prenume}</h1>
      <h1>Email: ${data.email}</h1>
      <h1>Mesaj: ${data.mesaj}</h1>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        await transporter.sendMail(msg)
      } else {
        await transporter.sendMail(msg)
      }
    },
  }
}
