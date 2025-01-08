import db from "db"
import { Ctx, invoke } from "blitz"

type user = {
  id: number
  name: string
  phone: string
  cnp: string
}

export default async function updateUser(user: user, ctx: Ctx) {
  ctx.session.$authorize()

  await db.user
    .update({
      where: { id: user.id },
      data: { name: user.name, phone: user.phone, cnp: user.cnp },
    })
    .then((result) => {
      console.log(result)
      return result
    })
}
