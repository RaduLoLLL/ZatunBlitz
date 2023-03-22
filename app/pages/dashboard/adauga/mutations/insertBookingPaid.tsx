import db from "db"
import { Ctx } from "blitz"
import { v4 as uuidv4 } from "uuid"

type booking = {
  starts_at: Date
  ends_at: Date
  intrare_complex: number
  loc_parcare: number
  loc_pescuit: number
  casuta: number
  total_price: number
}

export default async function insertBookingPaid(booking: booking, ctx: Ctx) {
  ctx.session.$authorize()

  console.log(ctx.session.userId)
  await db.booking.create({
    data: {
      starts_at: booking.starts_at,
      ends_at: booking.ends_at,
      intrare_complex: Number(booking.intrare_complex),
      loc_parcare: Number(booking.loc_parcare),
      loc_pescuit: booking.loc_pescuit,
      casuta: booking.casuta,
      total_price: Number(booking.total_price),
      userId: ctx.session.userId,
      paid: true,
      stripeSessionId: uuidv4(),
    },
  })
}
