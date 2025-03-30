import confirmOrderPaid from "app/pages/checkout/mutations/confirmOrderPaid"
import { invoke } from "blitz"
import { addHours } from "date-fns"
import db from "db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const unpaidBookings = await db.booking
    .findMany({
      where: {
        AND: [
          {
            paid: false,
            createdAt: {
              //booking older than 30 minutes
              lte: new Date(addHours(new Date().getTime() - 30 * 60 * 1000, 3)),
            },
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
}
