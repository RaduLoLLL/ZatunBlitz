import db from "db"
import subDays from "date-fns/subDays"
import { addDays } from "date-fns"

export default async function getBookingBySessionId(stripeSessionId) {
  return await db.booking.findFirst({
    where: {
      stripeSessionId: stripeSessionId,
    },
    orderBy: { createdAt: "desc" },
    include: { User: true },
  })
}
