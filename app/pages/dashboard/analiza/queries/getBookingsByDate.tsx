import { addDays } from "date-fns"
import db from "db"

export default async function getBookingsByDate(date: string) {
  return db.booking.findMany({
    where: {
      AND: {
        starts_at: { gte: new Date(date), lte: addDays(new Date(date), 1) },
        OR: [
          { User: { email: "acces1@baltazatun.ro" } },
          { User: { email: "acces2@baltazatun.ro" } },
          { User: { email: "agache.catalin@baltazatun.ro" } },
          { User: { email: "paslaru.alexandru@baltazatun.ro" } },
          { User: { email: "contabilitate@baltazatun.ro" } },
        ],
      },
    },
  })
}
