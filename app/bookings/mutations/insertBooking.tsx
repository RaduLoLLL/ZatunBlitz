import db from "db"
import { Ctx } from "blitz"

type booking = {
  starts_at: Date
  ends_at: Date
  intrare_complex: number
  loc_parcare: number
  loc_pescuit: number
  casuta: number
  foisor_mare: boolean
  foisor_mic: number
  sezlong: number
  sedinta_foto: boolean
  petrecere_privata: boolean
  total_price: number
}

export default async function insertBooking(booking: booking, ctx: Ctx) {
  ctx.session.$authorize()
  await db.booking.create({
    data: {
      starts_at: booking.starts_at,
      ends_at: booking.ends_at,
      intrare_complex: Number(booking.intrare_complex),
      loc_parcare: Number(booking.loc_parcare),
      loc_pescuit: booking.loc_pescuit,
      casuta: booking.casuta,
      foisor_mare: booking.foisor_mare,
      foisor_mic: booking.foisor_mic,
      sezlong: Number(booking.sezlong),
      sedinta_foto: booking.sedinta_foto,
      petrecere_privata: booking.petrecere_privata,
      total_price: Number(booking.total_price),
      userId: ctx.session.userId,
    },
  })
  console.log(booking)
}
