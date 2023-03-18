import db from "db"

//And this is the actual call to the database
export default async function getLatestBlocked() {
  return await db.blockedDates.findMany({ orderBy: { id: "desc" }, take: 1 })
}
