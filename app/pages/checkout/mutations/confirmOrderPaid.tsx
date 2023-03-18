import db from "db"
import { Ctx } from "blitz"
const axios = require("axios")

export default async function confirmOrderPaid({ orderId, booking_id }, ctx: Ctx) {
  const intBookingId = parseInt(booking_id)
  const booking = await db.booking.findFirst({ where: { id: intBookingId } })

  const urlencodedPayload = `userName=test_iPay3_api&password=test_iPay3_ap%21e4r&orderId=${orderId}`
  const orderStatus = await axios.post(
    "https://ecclients.btrl.ro:5443/payment/rest/getOrderStatusExtended.do",
    urlencodedPayload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  const updateBooking =
    orderStatus.data.orderStatus === 2
      ? await db.booking.update({
          where: { id: booking?.id },
          data: { paid: true, stripeSessionId: orderId },
        })
      : false

  return updateBooking
}
