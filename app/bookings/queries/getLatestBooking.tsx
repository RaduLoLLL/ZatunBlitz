import db from "db"
import { Ctx } from "blitz"

//And this is the actual call to the database
export default async function getLatestBooking(booking_id, ctx: Ctx) {
  console.log("UserIDDDD", ctx.session.userId)
  console.log("GetLatestBooking", booking_id)
  if (booking_id) {
    console.log("Got to first if")
    return await db.booking.findFirst({
      where: { userId: ctx.session.userId, paid: false, id: parseInt(booking_id) },
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
