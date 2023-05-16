import db from "db"

export default async function getBookings(params) {
  if (params.sessionId) {
    return db.booking.findMany({
      where: { stripeSessionId: { equals: params.sessionId } },
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
      include: { User: true },
    })
  }

  return db.booking.findMany({
    where: { paid: true },
    orderBy: { createdAt: "desc" },
    include: { User: true },
  })
}
