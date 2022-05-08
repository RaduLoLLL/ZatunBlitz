import db from "db"
import { Ctx } from "blitz"

export default async function confirmOrderPaid(sessionId: string, ctx: Ctx) {
  const booking = await db.booking.findFirst({ where: { stripeSessionId: sessionId } })

  return await db.booking.update({ where: { id: booking?.id }, data: { paid: true } })
}
