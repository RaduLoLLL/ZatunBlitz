import db from "db"
import Stripe from "stripe"
import { Ctx } from "blitz/dist/declarations/src"
import { format } from "date-fns"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const stripe = new Stripe(
  "sk_test_51KwksbK12xH0MvuUqzI0ibWFUlkVQl6OsQqLS6eyGr6Z1I3vs6mWA8bE6qQ3FSUIsQRxszXDH1tC2uGBw4HGvMpj00F2WMUy0T",
  {
    apiVersion: "2020-08-27",
  }
)

export default async function createCheckoutSession(user: any, ctx: Ctx) {
  const booking = await db.booking.findFirst({
    where: { paid: false, userId: ctx.session.userId },
    orderBy: {
      id: "desc",
    },
  })

  if (!booking) return

  const productData: {
    price_data: { currency: string; unit_amount: number; product_data: { name: string } }
    quantity: number
  }[] = []

  if (booking.intrare_complex > 0) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 2000,
        product_data: {
          name: "Intrare Agrement",
        },
      },
      quantity: booking.intrare_complex,
    })
  }

  if (booking.loc_parcare > 0) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 500,
        product_data: {
          name: "Loc de Parcare",
        },
      },
      quantity: booking.loc_parcare,
    })
  }

  if (booking.loc_pescuit.length > 0) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 5000,
        product_data: {
          name: "Loc de Pescuit " + booking.loc_pescuit,
        },
      },
      quantity: booking.loc_pescuit.length,
    })
  }

  if (booking.casuta.length > 0) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 10000,
        product_data: {
          name: "Casuta numarul " + booking.casuta,
        },
      },
      quantity: booking.casuta.length,
    })
  }
  const bt_username = process.env.BT_USERNAME
  const bt_password = process.env.BT_PASSWORD

  // const plata2 = console.log(
  //   await fetch("https://ecclients.btrl.ro:5443/payment/rest/register.do", {
  //     method: "POST",
  //     body: `userName=test_iPay3_api&password=test_iPay3_ap!e4r&orderNumber=${booking.id}&amout=${
  //       booking.total_price
  //     }&currency=946&description=${"Plata balta zatun"}&returnUrl=https://baltazatun.ro/checkout/succes?session_id=${
  //       booking.id
  //     }&orderBundle={"orderCreationDate":${format(
  //       new Date(),
  //       "yyyy-MM-dd"
  //     )},"customerDetails":{"email":${user.email},"phone":${parseInt(
  //       "4" + user.phone
  //     )},"deliveryInfo":{"deliveryType":"Delivery",country":"642","city":"Galati","postAdress":"Balta Zatun"} ,"billingInfo":{"country":"642","city":"Galati","postAdress":"Balta Zatun"}}}`,
  //     headers: new Headers({ "content-type": "x-www-form-urlencoded" }),
  //     mode: "no-cors",
  //   })
  // )

  const axios = require("axios")
  const payload = {
    userName: "test_iPay3_api",
    password: "test_iPay3_ap!e4r",
    orderNumber: booking.id.toString() /* string */,
    amount: booking.total_price /* int */,
    currency: 946 /* int */,
    description: "Plata rezervarii Balta Zatun" /* string */,
    returnUrl: `https://www.baltazatun.ro/checkout/succes?session_id=${booking.id}` /* string */,
    orderBundle: {
      orderCreationDate: format(new Date(), "yyyy-MM-dd") /* 2023-03-13 */,
      customerDetails: {
        email: user.email /* string */,
        phone: parseInt("4" + user.phone) /* int */,
        deliveryInfo: {
          deliveryType: "DELIVERY" /* string */,
          country: 642 /* int */,
          city: "Galati" /* string */,
          postAddress: "Balta Zatun" /* string */,
        },
        billingInfo: {
          deliveryType: "DELIVERY" /* string */,
          country: 642 /* int */,
          city: "Galati" /* string */,
          postAddress: "Balta Zatun" /* string */,
        },
      },
    },
  }

  const res = axios.post("https://ecclients.btrl.ro:5443/payment/rest/register.do", payload)
  console.log(res)
  // const plata = console.log(
  //   await fetch("https://ecclients.btrl.ro:5443/payment/rest/register.do", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       userName: "test_iPay3_api",
  //       password: "test_iPay3_ap!e4r",
  //       orderNumber: booking.id.toString() /* string */,
  //       amount: booking.total_price /* int */,
  //       currency: 946 /* int */,
  //       description: "Plata rezervarii Balta Zatun" /* string */,
  //       returnUrl: `http://localhost:3000/checkout/succes?session_id=${booking.id}` /* string */,
  //       orderBundle: {
  //         orderCreationDate: format(new Date(), "yyyy-MM-dd") /* 2023-03-13 */,
  //         customerDetails: {
  //           email: user.email /* string */,
  //           phone: parseInt("4" + user.phone) /* int */,
  //           deliveryInfo: {
  //             deliveryType: "DELIVERY" /* string */,
  //             country: 642 /* int */,
  //             city: "Galati" /* string */,
  //             postAddress: "Balta Zatun" /* string */,
  //           },
  //           billingInfo: {
  //             deliveryType: "DELIVERY" /* string */,
  //             country: 642 /* int */,
  //             city: "Galati" /* string */,
  //             postAddress: "Balta Zatun" /* string */,
  //           },
  //         },
  //       },
  //     }),
  //     headers: new Headers({ "content-type": "application/json" }),
  //     mode: "no-cors",
  //   })
  // )

  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   payment_method_types: ["card"],
  //   line_items: productData,
  //   success_url: "https://zatun-blitz.vercel.app/checkout/succes?session_id={CHECKOUT_SESSION_ID}",
  //   cancel_url: "https://zatun-blitz.vercel.app",
  // })

  const bookingId = await db.booking.findFirst({
    where: { userId: ctx.session.userId },
    orderBy: { id: "desc" },
  })

  const updateBooking = await db.booking.update({
    where: { id: bookingId?.id },
    data: { stripeSessionId: booking.id.toString() },
  })

  return {
    sessionId: booking.id.toString(),
  }
}
