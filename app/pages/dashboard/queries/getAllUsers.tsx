import db from "db"

export default async function getAllUsers() {
  return db.user.findMany()
}
