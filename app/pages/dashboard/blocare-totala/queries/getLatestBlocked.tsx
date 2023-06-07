import db from "db"

//And this is the actual call to the database
export default async function getLatestBlocked() {
  const blocked = await db.blockedDates.findMany({ orderBy: { id: "desc" }, take: 1 })
  return blocked ? blocked : []
}
