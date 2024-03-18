import db from "db"

export default async function getQrInfo(sessionId) {
  //console.log(sessionId.orderId)
  return db.booking.findFirst({ where: { stripeSessionId: sessionId } })
}
