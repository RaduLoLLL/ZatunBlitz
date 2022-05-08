import db from "db"

//And this is the actual call to the database
export default async function getAllBookings() {
  return await db.booking.findMany()
}
