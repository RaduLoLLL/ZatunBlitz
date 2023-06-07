import db from "db"
import addDays from "date-fns/addDays"

//And this is the actual call to the database
export default async function getAllBookings(startsAt: string) {
  const bookings = await db.booking
    .findMany({
      where: { starts_at: { gte: new Date(startsAt), lte: addDays(new Date(startsAt), 1) } },
    })
    .catch((error) => {
      console.log(error)
    })
  return bookings ? bookings : []
}
