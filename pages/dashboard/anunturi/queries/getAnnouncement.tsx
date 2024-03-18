import db from "db"

export default async function getAnnouncement() {
  return db.announcement.findFirst()
}
