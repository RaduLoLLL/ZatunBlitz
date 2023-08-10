import db from "db"
import { Ctx } from "blitz"
import { v4 as uuidv4 } from "uuid"

export default async function insertAnnouncement({ content, id }, ctx: Ctx) {
  // ctx.session.$authorize()

  // console.log(ctx.session.userId)
  await db.announcement.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  })
}
