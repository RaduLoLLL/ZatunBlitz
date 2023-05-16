import db from "db"
import { Ctx, invoke, useQuery } from "blitz"
import { addHours, format } from "date-fns"
import { useCurrentBookings } from "../hooks/useCurrentBookings"
import toast from "react-hot-toast"
import getAllBookings from "../queries/getAllBookings"
import getAllBookingsMutation from "./getAllBookingsMutation"
import { v4 as uuidv4 } from "uuid"

type booking = {
  starts_at: Date
  ends_at: Date
  intrare_complex: number
  loc_parcare: number
  loc_pescuit: number[]
  casuta: number[]
  total_price: number
}

export default async function insertBooking(booking: booking, ctx: Ctx) {
  ctx.session.$authorize()
  const uuid = uuidv4().replace(/-/g, "")
  const bookings = await invoke(getAllBookingsMutation, booking.starts_at)

  const spotsArray: any[] = []
  const casutaSpotsArray: any[] = []
  bookings.map((booking) => {
    if (booking.loc_pescuit.length) {
      spotsArray.push(booking.loc_pescuit)
    }
    if (booking.casuta.length) {
      casutaSpotsArray.push(booking.casuta)
    }
  })
  spotsArray.push([1, 2, 9, 10])
  const ocuppiedFishingSpots = [].concat.apply([], spotsArray)
  const occupiedCasuta = [].concat.apply([], casutaSpotsArray)

  booking.loc_pescuit?.map((loc) => {
    if (ocuppiedFishingSpots.includes(loc)) {
      throw { id: 1, loc: loc }
    }
  })
  booking.casuta.map((loc) => {
    if (occupiedCasuta.includes(loc)) {
      throw { id: 2, loc }
    }
  })

  await db.booking
    .create({
      data: {
        createdAt: addHours(new Date(), 3),
        starts_at: addHours(booking.starts_at, 3),
        ends_at: addHours(booking.ends_at, 3),
        intrare_complex: Number(booking.intrare_complex),
        loc_parcare: Number(booking.loc_parcare),
        loc_pescuit: booking.loc_pescuit,
        casuta: booking.casuta,
        total_price: Number(booking.total_price),
        userId: ctx.session.userId,
        stripeSessionId: uuid,
      },
    })
    .then((result) => {
      return result
    })
}
