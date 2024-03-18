import db from "db"
import { Ctx } from "blitz"

export default async function insertBlockedDates(ctx: Ctx) {
  ctx.session.$authorize()

  await db.blockedDates.deleteMany({})
}
