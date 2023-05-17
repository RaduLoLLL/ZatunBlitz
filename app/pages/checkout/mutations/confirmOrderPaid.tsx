import db from "db"
import { Ctx } from "blitz"
const axios = require("axios")

export default async function confirmOrderPaid({ orderId, booking_id, orderNumber }, ctx: Ctx) {
  const intBookingId = parseInt(booking_id)
  const booking = await db.booking.findFirst({ where: { id: intBookingId } })
  const bt_username = process.env.BT_USERNAME
  const bt_password = process.env.BT_PASSWORD
  const bt_url = process.env.BT_URL

  const urlencodedPayload = orderId
    ? `userName=${bt_username}&password=${bt_password}&orderId=${orderId}&orderNumber=${orderNumber}`
    : `userName=${bt_username}&password=${bt_password}&orderNumber=${orderNumber}`
  const orderStatus = await axios.post(
    `${bt_url}/payment/rest/getOrderStatusExtended.do`,
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
        data: { paid: true },
      })
    : false

  return orderStatus.data.orderStatus === 2
}
