import db from "db"
import subDays from "date-fns/subDays"

export default async function getLast7DaysBookings() {
  return await db.booking.findMany({
    where: { starts_at: { gte: subDays(new Date(), 7), lte: new Date() } },
    include: { User: true },
  })
}
