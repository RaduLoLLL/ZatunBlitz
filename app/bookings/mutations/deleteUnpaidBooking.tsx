import { Ctx } from "blitz"
import { addHours } from "date-fns"
import db from "db"
export default async function deleteUnpaidBooking(ctx: Ctx) {
  console.log(new Date(addHours(new Date().getTime() - 30 * 60 * 1000, 3)))
  // Function that uses prisma and deteles all bookings older that 30 minutes where paid is false
  await db.booking.deleteMany({
    where: {
      AND: [
        {
          createdAt: {
            lte: new Date(addHours(new Date().getTime() - 30 * 60 * 1000, 3)),
          },
        },
        {
          paid: false,
        },
      ],
    },
  })
}
