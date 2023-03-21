import { Ctx } from "blitz"
import db from "db"
export default async function deleteUnpaidBooking(ctx: Ctx) {
  // Function that uses prisma and deteles all bookings older that 30 minutes where paid is false
  await db.booking.deleteMany({
    where: {
      AND: [
        {
          createdAt: {
            lte: new Date(new Date().getTime() - 30 * 60 * 1000),
          },
        },
        {
          paid: false,
        },
      ],
    },
  })
}
