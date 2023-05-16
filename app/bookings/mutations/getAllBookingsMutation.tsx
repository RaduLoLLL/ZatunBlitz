import db from "db"
import addDays from "date-fns/addDays"

//And this is the actual call to the database
export default async function getAllBookingsMutation(startsAt: string) {
  console.log("Mutation starts at", new Date(startsAt))
  console.log("Mutation ends at", addDays(new Date(startsAt), 1))
  return await db.booking.findMany({
    where: { starts_at: { gte: new Date(startsAt), lte: addDays(new Date(startsAt), 1) } },
  })
}
