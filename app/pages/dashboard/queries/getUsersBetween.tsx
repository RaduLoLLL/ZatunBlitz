import db from "db"
import subDays from "date-fns/subDays"

export default async function getUsersBetween() {
  return await db.user.findMany({
    where: { createdAt: { lte: subDays(new Date(), 14), gte: subDays(new Date(), 7) } },
  })
}
