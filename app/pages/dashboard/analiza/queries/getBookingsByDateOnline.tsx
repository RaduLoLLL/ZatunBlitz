import { addDays } from "date-fns"
import db from "db"

export default async function getBookingsByDateOnline(date: string) {
  return db.booking.findMany({
    where: {
      AND: {
        starts_at: { gte: new Date(date), lte: addDays(new Date(date), 1) },
        NOT: { User: { email: { startsWith: "admin" } } },
      },
    },
  })
}
