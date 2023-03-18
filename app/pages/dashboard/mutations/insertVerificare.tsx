import db from "db"
import { Ctx } from "blitz"

export default async function insertVerificare(booking_id: number, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.booking.update({
    where: { id: booking_id },
    data: { verificat: true },
  })
}
