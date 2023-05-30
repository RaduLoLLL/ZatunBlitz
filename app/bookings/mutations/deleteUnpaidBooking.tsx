import confirmOrderPaid from "app/pages/checkout/mutations/confirmOrderPaid"
import { Ctx, invoke } from "blitz"
import { addHours } from "date-fns"
import db from "db"
export default async function deleteUnpaidBooking(userId, ctx: Ctx) {
  // Function that uses prisma and deteles all bookings older that 30 minutes where paid is false
  const unpaidBookings = await db.booking
    .findMany({
      where: {
        AND: [
          {
            paid: false,
          },
        ],
      },
    })
    .then((unpaidBookings) => {
      if (unpaidBookings.length > 0) {
        unpaidBookings.map(async (booking) => {
          const confirm = await invoke(confirmOrderPaid, {
            booking_id: booking.id,
            orderNumber: booking.stripeSessionId,
          })
        })
      }
    })
    .then(async () => {
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
    })

  return
}
