import db from "db"
import { Ctx } from "blitz"
import { addHours } from "date-fns"
type BlockedDates = {
  startDate: Date
  endDate: Date
}

export default async function insertBlockedDates(blockedDates: BlockedDates, ctx: Ctx) {
  ctx.session.$authorize()
  console.log(
    await db.blockedDates.create({
      data: {
        startDate: addHours(blockedDates.startDate, 3),
        endDate: addHours(blockedDates.endDate, 3),
      },
    })
  )
}
