import { contactMailer } from "mailers/contactMailer"

export default async function sendEmail(data) {
  await contactMailer(data).send()
}
