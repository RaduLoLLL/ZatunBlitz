import db from "db"

export default async function getQrInfo(sessionId) {
  return db.booking.findFirst({ where: { stripeSessionId: sessionId } })
}
