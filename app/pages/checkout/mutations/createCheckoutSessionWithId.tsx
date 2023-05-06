import db from "db"
import { Ctx } from "blitz/dist/declarations/src"
import { v4 as uuidv4 } from "uuid"

export default async function createCheckoutSessionWithId({ booking_id, user }, ctx: Ctx) {
  const axios = require("axios")
  const booking = await db.booking.findFirst({
    where: { userId: ctx.session.userId, paid: false, id: parseInt(booking_id) },
    orderBy: {
      id: "desc",
    },
  })
  if (!booking) return

  const uuid = uuidv4().replace(/-/g, "")
  const bt_username = process.env.BT_USERNAME
  const bt_password = process.env.BT_PASSWORD
  const base_url = process.env.BASE_URL
  const bt_url = process.env.BT_URL

  const urlencodedPayload =
    `userName=${bt_username}&password=${bt_password}&orderNumber=${uuid}&amount=${
      booking.total_price * 100
    }&currency=946&description=Plata%20rezervarii%20Balta%20Zatun&returnUrl=${base_url}%2Fcheckout%2Fsucces%3Fbooking_id%3D${
      booking.id
    }&` +
    `orderBundle%3D%7B%22orderCreationDate%22%3A%22${new Date()}%22%2C%22customerDetails%22%3A%7B%22email%22%3A${
      user.email
    }%2C%22phone%22%3A%22${
      "4" + user.phone
    }%22%2C%22deliveryInfo%22%3A%7B%22deliveryType%22%3A%22Delivery%22%2Ccountry%22%3A%22642%22%2C%22city%22%3A%22Galati%22%2C%22postAdress%22%3A%22Balta%20Zatun%22%7D%20%2C%22billingInfo%22%3A%7B%22country%22%3A%22642%22%2C%22city%22%3A%22Galati%22%2C%22postAdress%22%3A%22Balta%20Zatun%22%7D%7D%7D%60%2C%0A%20%20%20%20`

  const res = await axios.post(`${bt_url}/payment/rest/register.do`, urlencodedPayload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })

  return {
    data: res.data,
  }
}
