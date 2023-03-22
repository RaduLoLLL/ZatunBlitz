import db from "db"
import { Ctx } from "blitz"
const axios = require("axios")

export default async function confirmOrderPaid({ orderId, booking_id }, ctx: Ctx) {
  const intBookingId = parseInt(booking_id)
  const booking = await db.booking.findFirst({ where: { id: intBookingId } })
  const bt_username = process.env.DEV_BT_USERNAME
  const bt_password = process.env.DEV_BT_PASSWORD

  const urlencodedPayload = `userName=${bt_username}&password=${bt_password}&orderId=${orderId}`
  const orderStatus = await axios.post(
    "https://ecclients.btrl.ro:5443/payment/rest/getOrderStatusExtended.do",
    urlencodedPayload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  orderStatus.data.orderStatus === 2
    ? await db.booking.update({
        where: { id: booking?.id },
        data: { paid: true, stripeSessionId: orderId },
      })
    : false

  return orderStatus.data.orderStatus === 2
}
