import db from "db"
import subDays from "date-fns/subDays"
import { addDays } from "date-fns"

export default async function getLast7DaysBookings() {
  return await db.booking.findMany({
    where: { createdAt: { gte: subDays(new Date(), 7), lte: addDays(new Date(), 1) }, paid: true },
    include: { User: true },
  })
}
