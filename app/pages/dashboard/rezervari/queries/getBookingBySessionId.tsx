import db from "db"

export default async function getBookingBySessionId(stripeSessionId) {
  return await db.booking.findFirst({
    where: {
      stripeSessionId: stripeSessionId,
    },
    orderBy: { createdAt: "desc" },
    include: { User: true },
  })
}
