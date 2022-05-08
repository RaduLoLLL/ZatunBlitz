import db from "db"
import { Ctx } from "blitz"

//And this is the actual call to the database
export default async function getLatestBooking(_, ctx: Ctx) {
  return await db.booking.findFirst({
    where: { userId: ctx.session.userId, paid: false },
    orderBy: {
      id: "desc",
    },
  })
}
