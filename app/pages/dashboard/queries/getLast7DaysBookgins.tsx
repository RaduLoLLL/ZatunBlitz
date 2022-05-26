import db from "db"
import subDays from "date-fns/subDays"
import { addDays } from "date-fns"

export default async function getLast7DaysBookings() {
  return await db.booking.findMany({
    where: { starts_at: { gte: subDays(new Date(), 7), lte: addDays(new Date(), 1) } },
    include: { User: true },
  })
}
