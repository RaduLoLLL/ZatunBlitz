import { addDays } from "date-fns"
import db from "db"
type DateInterval = {
  startDate: string
  endDate: string
}
export default async function getBookingsByStartDate(date: DateInterval) {
  return db.booking.findMany({
    where: {
      AND: {
        starts_at: { gte: new Date(date.startDate), lte: addDays(new Date(date.endDate), 1) },
        paid: true,
      },
    },
    include: { User: true },
  })
}
