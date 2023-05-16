import db from "db"
import { Ctx } from "blitz"

//And this is the actual call to the database
export default async function getLatestBooking(booking_id, ctx: Ctx) {
  if (booking_id) {
    return await db.booking.findFirst({
      where: { userId: ctx.session.userId, id: parseInt(booking_id) },
      orderBy: {
        id: "desc",
      },
    })
  } else {
    return await db.booking.findFirst({
      where: { userId: ctx.session.userId, paid: false },
      orderBy: {
        id: "desc",
      },
    })
  }
}
