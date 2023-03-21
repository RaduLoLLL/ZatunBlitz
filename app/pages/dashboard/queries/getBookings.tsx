import db from "db"

export default async function getBookings(params) {
  if (params.sessionId) {
    return db.booking.findMany({
      where: { stripeSessionId: { equals: params.sessionId } },
      take: 5,
      include: { User: true },
    })
  }

  if (params.name) {
    return db.booking.findMany({
      where: {
        User: {
          OR: [
            { name: { contains: params.name, mode: "insensitive" } },
            { surname: { contains: params.name, mode: "insensitive" } },
          ],
        },
      },
      take: 5,
      include: { User: true },
    })
  }
  if (params.surname) {
    return db.booking.findMany({
      where: {
        User: {
          OR: [
            { name: { contains: params.surname, mode: "insensitive" } },
            { surname: { contains: params.surname, mode: "insensitive" } },
          ],
        },
      },
      take: 5,
      include: { User: true },
    })
  }

  if (params.phone) {
    return db.booking.findMany({
      where: {
        User: {
          phone: { contains: params.phone },
        },
      },
      take: 5,

      include: { User: true },
    })
  }

  if (params.email) {
    return db.booking.findMany({
      where: {
        User: {
          email: { startsWith: params.email, mode: "insensitive" },
        },
      },
      take: 5,

      include: { User: true },
    })
  }

  return db.booking.findMany({
    where: { paid: true },
    orderBy: { createdAt: "desc" },
    take: 15,
    include: { User: true },
  })
}
