import db from "db"

export default async function getLocalBooking() {
  return await db.booking.findMany({
    where: { User: { email: { startsWith: "admin" } } },
  })
}
