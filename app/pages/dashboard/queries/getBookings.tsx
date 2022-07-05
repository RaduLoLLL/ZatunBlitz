import db from "db"

export default async function getBookings(params) {
  if (params.sessionId) {
    return db.booking.findFirst({
      where: { stripeSessionId: { equals: params.sessionId } },
      take: 5,
    })
  }

  if (params.name) {
    return db.booking.findMany({
      where: {
        User: { name: { startsWith: params.name } },
      },
      take: 5,
      include: { User: true },
    })
  }
  if (params.surname) {
    return db.booking.findMany({
      where: {
        User: { surname: { startsWith: params.surname } },
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
          email: { startsWith: params.email },
        },
      },
      take: 5,

      include: { User: true },
    })
  }

  return db.booking.findMany({
    orderBy: { starts_at: "desc" },
    take: 15,
    include: { User: true },
  })
}
