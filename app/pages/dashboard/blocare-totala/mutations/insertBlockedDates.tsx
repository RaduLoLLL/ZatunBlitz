import db from "db"
import { Ctx } from "blitz"
type BlockedDates = {
  startDate: Date
  endDate: Date
}

export default async function insertBlockedDates(blockedDates: BlockedDates, ctx: Ctx) {
  ctx.session.$authorize()
  console.log(
    await db.blockedDates.create({
      data: {
        startDate: blockedDates.startDate,
        endDate: blockedDates.endDate,
      },
    })
  )
}
