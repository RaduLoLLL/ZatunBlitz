import { Ctx } from "blitz"
import db from "db"

export default async function getUnpaidBookingDetails(bookingId, ctx: Ctx) {
  return await db.booking.findMany({ where: { userId: ctx.session.userId, id: bookingId } })
}
