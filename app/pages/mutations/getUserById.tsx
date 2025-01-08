// app/users/mutations/getUser.ts
import { Ctx } from "blitz"
import db from "db"

export default async function getUser(userId: number, ctx: Ctx) {
  const user = await db.user.findUnique({
    where: { id: userId },
  })
  return user
}
