import db from "db"
import subDays from "date-fns/subDays"

export default async function getBookingsBetween() {
  return await db.booking.findMany({
    where: { starts_at: { gte: subDays(new Date(), 14), lte: subDays(new Date(), 7) }, paid: true },
    include: { User: true },
  })
}
