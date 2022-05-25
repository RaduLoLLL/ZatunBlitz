import db from "db"
import subDays from "date-fns/subDays"

export default async function getLast7DaysUsers() {
  return await db.user.findMany({
    where: { createdAt: { gte: subDays(new Date(), 7), lte: new Date() } },
  })
}
