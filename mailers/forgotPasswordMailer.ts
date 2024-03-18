/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */

type ResetPasswordMailer = {
  to: string
  token: string
}
import { Resend } from 'resend';
const key = process.env.RESEND_KEY
const resend = new Resend(key);

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`
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

  const msg = {
    from: "reset@baltazatun.ro",
    to,
    subject: "Instrucțiuni pentru resetarea parolei",
    html: `
      <h1>Resetează parola contului de pe Balta Zatun</h1>


      <a href="${resetUrl}">
        Apasă aici pentru a reseta parola
      </a>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        await resend.emails.send(msg)
      } else {
        await resend.emails.send(msg)
      }
    },
  }
}
