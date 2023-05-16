import db from "db"

export default async function getAllUsers(params) {
  if (params.name) {
    return db.user.findMany({
      where: {
        OR: [
          { name: { contains: params.name, mode: "insensitive" } },
          { surname: { contains: params.name, mode: "insensitive" } },
        ],
      },
    })
  }
  if (params.surname) {
    return db.user.findMany({
      where: {
        OR: [
          { name: { contains: params.surname, mode: "insensitive" } },
          { surname: { contains: params.surname, mode: "insensitive" } },
        ],
      },
    })
  }
  if (params.phone) {
    return db.user.findMany({
      where: {
        phone: { contains: params.phone },
      },
    })
  }
  if (params.email) {
    return db.user.findMany({
      where: {
        email: { startsWith: params.email, mode: "insensitive" },
      },
    })
  }
  return db.user.findMany()
}
