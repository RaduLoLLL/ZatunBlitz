import { addDays } from "date-fns"
import db from "db"
type DateInterval = {
  startDate: string
  endDate: string
}
export default async function getBookingsByDateOnline(date: DateInterval) {
  return db.booking.findMany({
    where: {
      AND: {
        createdAt: { gte: new Date(date.startDate), lte: addDays(new Date(date.endDate), 1) },
        NOT: {
          OR: [
            { User: { email: "acces1@baltazatun.ro" } },
            { User: { email: "acces2@baltazatun.ro" } },
            { User: { email: "agache.catalin@baltazatun.ro" } },
            { User: { email: "paslaru.alexandru@baltazatun.ro" } },
            { User: { email: "contabilitate@baltazatun.ro" } },
            { User: { email: "administrator@baltazatun.ro" } },
          ],
        },
        paid: true,
      },
    },
  })
}
