import { addDays } from "date-fns"
import db from "db"
type DateInterval = {
  startDate: string
  endDate: string
}
export default async function getBookingsByDate(date: DateInterval) {
  console.log(date)
  return db.booking.findMany({
    where: {
      AND: {
        starts_at: { gte: new Date(date.startDate), lte: addDays(new Date(date.endDate), 1) },
        OR: [
          { User: { email: "acces1@baltazatun.ro" } },
          { User: { email: "acces2@baltazatun.ro" } },
          { User: { email: "contabilitate@baltazatun.ro" } },
        ],
      },
    },
  })
}
