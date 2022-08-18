import db from "db"
import subDays from "date-fns/subDays"
import { addDays } from "date-fns"

export default async function getLocalLast7Days() {
  return await db.booking.findMany({
    where: {
      AND: {
        User: { email: { startsWith: "admin" } },
        starts_at: { gte: subDays(new Date(), 7), lte: addDays(new Date(), 1) },
      },
    },
  })
}
