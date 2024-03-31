import db from "db"
import { Ctx } from "blitz"
import { addHours } from "date-fns"
type BlockedDates = {
  blockedDates: Date[]
}

export default async function insertBlockedDates(blockedDates: BlockedDates, ctx: Ctx) {
  ctx.session.$authorize()
  console.log(
    await db.blockedDates.create({
      data: {
        startDate: new Date(),
        endDate: new Date(),
        blockedDates: blockedDates.blockedDates,
      },
    })
  )
}
