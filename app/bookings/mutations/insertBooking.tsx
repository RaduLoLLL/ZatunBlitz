import db from "db"
import { Ctx, invoke } from "blitz"
import { addHours, format } from "date-fns"
import getAllBookingsMutation from "./getAllBookingsMutation"
import { v4 as uuidv4 } from "uuid"

type booking = {
  starts_at: Date
  ends_at: Date
  intrare_complex: number
  loc_parcare: number
  loc_pescuit: number[]
  casuta: number[]
  casuta2: number[]
  foisormic: number[]
  foisormare: number[]
  foisormic2: number[]
  foisormare2: number[]
  total_price: number
}

export default async function insertBooking(booking: booking, ctx: Ctx) {
  ctx.session.$authorize()
  const uuid = uuidv4().replace(/-/g, "")
  const bookings = await invoke(getAllBookingsMutation, format(booking.starts_at, "yyyy-MM-dd"))

  const spotsArray: any[] = []
  const casutaSpotsArray: any[] = []
  const casuta2SpotsArray: any[] = []
  const foisormicSpotsArray: any[] = []
  const foisormareSpotsArray: any[] = []
  const foisormic2SpotsArray: any[] = []
  const foisormare2SpotsArray: any[] = []
  if (bookings) {
    bookings.map((booking) => {
      if (booking.loc_pescuit.length) {
        spotsArray.push(booking.loc_pescuit)
      }
      if (booking.casuta.length) {
        casutaSpotsArray.push(booking.casuta)
      }
      if (booking.casuta2.length) {
        casuta2SpotsArray.push(booking.casuta2)
      }
      if (booking.foisormic.length) {
        foisormicSpotsArray.push(booking.foisormic)
      }
      if (booking.foisormare.length) {
        foisormareSpotsArray.push(booking.foisormare)
      }
      if (booking.foisormic2.length) {
        foisormic2SpotsArray.push(booking.foisormic2)
      }
      if (booking.foisormare2.length) {
        foisormare2SpotsArray.push(booking.foisormare2)
      }
    })
    spotsArray.push([1, 2, 9, 10])
    const ocuppiedFishingSpots = [].concat.apply([], spotsArray)
    const occupiedCasuta = [].concat.apply([], casutaSpotsArray)
    const occupiedCasuta2 = [].concat.apply([], casuta2SpotsArray)
    const occupiedFoisormic = [].concat.apply([], foisormicSpotsArray)
    const occupiedFoisormare = [].concat.apply([], foisormareSpotsArray)
    const occupiedFoisormic2 = [].concat.apply([], foisormic2SpotsArray)
    const occupiedFoisormare2 = [].concat.apply([], foisormare2SpotsArray)

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
    booking.casuta2.map((loc) => {
      if (occupiedCasuta2.includes(loc)) {
        throw { id: 2, loc }
      }
    })
    booking.foisormic.map((loc) => {
      if (occupiedFoisormic.includes(loc)) {
        throw { id: 2, loc }
      }
    })
    booking.foisormare.map((loc) => {
      if (occupiedFoisormare.includes(loc)) {
        throw { id: 2, loc }
      }
    })
    booking.foisormic2.map((loc) => {
      if (occupiedFoisormic2.includes(loc)) {
        throw { id: 2, loc }
      }
    })
    booking.foisormare2.map((loc) => {
      if (occupiedFoisormare2.includes(loc)) {
        throw { id: 2, loc }
      }
    })
  }

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
        casuta2: booking.casuta2,
        foisormic: booking.foisormic,
        foisormare: booking.foisormare,
        foisormic2: booking.foisormic2,
        foisormare2: booking.foisormare2,
        total_price: Number(booking.total_price),
        userId: ctx.session.userId,
        stripeSessionId: uuid,
      },
    })
    .then((result) => {
      return result
    })
}
