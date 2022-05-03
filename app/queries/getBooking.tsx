import db from "db"

export default async function getAvailableBooking() {
  return db.booking.findMany({ where: { startsAt: new Date() } })
}
