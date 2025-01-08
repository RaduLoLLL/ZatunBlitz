import { Ctx } from "blitz"
import db from "db"
export default async function getUserInfo(_, ctx: Ctx) {
  return await db.user.findUnique({ where: { userId: ctx.session.userId } })
}
