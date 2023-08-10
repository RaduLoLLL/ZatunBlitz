import db from "db"
import { Ctx } from "blitz"

export default async function insertAnnouncement({ content }, ctx: Ctx) {
  const Announcement = await db.announcement.findFirst()
  // ctx.session.$authorize()

  // console.log(ctx.session.userId)
  await db.announcement.update({
    where: {
      id: Announcement?.id,
    },
    data: {
      content: content,
    },
  })
}
