import db from "db"
import subDays from "date-fns/subDays"
import { addDays } from "date-fns"

export default async function getLatestBookings() {
  return await db.booking.findMany({
    where: { starts_at: { gte: subDays(new Date(), 7), lte: addDays(new Date(), 1) }, paid: true },
    include: { User: true },
    take: 7,
  })
}
