import { addDays } from "date-fns"
import db from "db"

export default async function getBookingsByStartDate(date: string) {
  console.log("Server date start", new Date(date))
  console.log("Server date end", addDays(new Date(date), 1))

  return db.booking.findMany({
    where: {
      AND: {
        starts_at: { gte: new Date(date), lte: addDays(new Date(date), 1) },
        NOT: {
          OR: [
            { User: { email: "acces1@baltazatun.ro" } },
            { User: { email: "acces2@baltazatun.ro" } },
            { User: { email: "agache.catalin@baltazatun.ro" } },
            { User: { email: "paslaru.alexandru@baltazatun.ro" } },
            { User: { email: "contabilitate@baltazatun.ro" } },
          ],
        },
        paid: true,
      },
    },
    include: { User: true },
  })
}
