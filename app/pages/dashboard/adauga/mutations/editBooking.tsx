import db from "db"
import { Ctx } from "blitz"
import { v4 as uuidv4 } from "uuid"
import { addHours } from "date-fns"

type booking = {
  id: number
  starts_at: Date
  ends_at: Date
  intrare_complex: number
  loc_parcare: number
  loc_pescuit: number
  casuta: number
  casuta2: number
}

export default async function editBooking(booking: booking, ctx: Ctx) {
  ctx.session.$authorize()

  console.log(ctx.session.userId)
  await db.booking.update({
    where: { id: booking.id },
    data: {
      starts_at: booking.starts_at,
      ends_at: booking.ends_at,
      intrare_complex: Number(booking.intrare_complex),
      loc_parcare: Number(booking.loc_parcare),
      loc_pescuit: booking.loc_pescuit,
      casuta: booking.casuta,
      casuta2: booking.casuta2,
    },
  })
}
