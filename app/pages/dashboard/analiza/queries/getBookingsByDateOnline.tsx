import { addDays } from "date-fns"
import db from "db"

export default async function getBookingsByDateOnline(date: string) {
  console.log("Server date end", addDays(new Date(date), 1))
  return db.booking.findMany({
    where: {
      AND: {
        createdAt: { gte: new Date(date), lte: addDays(new Date(date), 1) },
        NOT: {
          OR: [
            { User: { email: { startsWith: "acces" } } },
            { User: { email: { startsWith: "paslaru" } } },
            { User: { email: { startsWith: "agache" } } },
            { User: { email: { startsWith: "contabilitate" } } },
          ],
        },
      },
    },
  })
}
