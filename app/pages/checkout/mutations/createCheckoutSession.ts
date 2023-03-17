import db from "db"
import { Ctx } from "blitz/dist/declarations/src"
import { v4 as uuidv4 } from "uuid"

export default async function createCheckoutSession({ user, booking_id }, ctx: Ctx) {
  const booking = await db.booking.findFirst({
    where: { paid: false, userId: ctx.session.userId },
    orderBy: {
      id: "desc",
    },
  })

  if (!booking) return

  const bt_username = process.env.BT_USERNAME
  const bt_password = process.env.BT_PASSWORD

  const axios = require("axios")

  // 4140 4960 7036 0105

  const uuid = uuidv4().replace(/-/g, "")
  const urlencodedPayload =
    `userName=test_iPay3_api&password=test_iPay3_ap%21e4r&orderNumber=${uuid}&amount=${
      booking.total_price * 100
    }&currency=946&description=Plata%20rezervarii%20Balta%20Zatun&returnUrl=http%3A%2F%2Flocalhost:3000%2Fcheckout%2Fsucces%3Fbooking_id%3D${
      booking.id
    }&` +
    `orderBundle%3D%7B%22orderCreationDate%22%3A%22${new Date()}%22%2C%22customerDetails%22%3A%7B%22email%22%3A${
      user.email
    }%2C%22phone%22%3A%22${
      "4" + user.phone
    }%22%2C%22deliveryInfo%22%3A%7B%22deliveryType%22%3A%22Delivery%22%2Ccountry%22%3A%22642%22%2C%22city%22%3A%22Galati%22%2C%22postAdress%22%3A%22Balta%20Zatun%22%7D%20%2C%22billingInfo%22%3A%7B%22country%22%3A%22642%22%2C%22city%22%3A%22Galati%22%2C%22postAdress%22%3A%22Balta%20Zatun%22%7D%7D%7D%60%2C%0A%20%20%20%20`

  const res = await axios.post(
    "https://ecclients.btrl.ro:5443/payment/rest/register.do",
    urlencodedPayload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  const bookingId = await db.booking.findFirst({
    where: { userId: ctx.session.userId },
    orderBy: { id: "desc" },
  })

  const updateBooking = await db.booking.update({
    where: { id: bookingId?.id },
    data: { stripeSessionId: res.orderId },
  })

  return {
    data: res.data,
  }
}
