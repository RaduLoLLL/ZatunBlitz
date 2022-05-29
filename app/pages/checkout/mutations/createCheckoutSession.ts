import { resolver } from "blitz"
import db from "db"
import Stripe from "stripe"
import { Ctx } from "blitz/dist/declarations/src"

const stripe = new Stripe(
  "sk_test_51KwksbK12xH0MvuUqzI0ibWFUlkVQl6OsQqLS6eyGr6Z1I3vs6mWA8bE6qQ3FSUIsQRxszXDH1tC2uGBw4HGvMpj00F2WMUy0T",
  {
    apiVersion: "2020-08-27",
  }
)

export default async function createCheckoutSession(_, ctx: Ctx) {
  const booking = await db.booking.findFirst({
    where: { paid: false, userId: ctx.session.userId },
    orderBy: {
      id: "desc",
    },
  })

  if (!booking) return

  const productData = []

  if (booking.intrare_complex > 0) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 500,
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

  if (booking.loc_pescuit > 0) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 5000,
        product_data: {
          name: "Loc de Pescuit",
        },
      },
      quantity: 1,
    })
  }

  if (booking.casuta > 0) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 10000,
        product_data: {
          name: "Casuta numarul " + booking.casuta,
        },
      },
      quantity: 1,
    })
  }

  if (booking.sezlong > 0) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 1500,
        product_data: {
          name: "Sezlongul numarul " + booking.sezlong,
        },
      },
      quantity: 1,
    })
  }
  if (booking.sedinta_foto) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 10000,
        product_data: {
          name: "Sedinta Foto ",
        },
      },
      quantity: 1,
    })
  }
  if (booking.petrecere_privata) {
    productData.push({
      price_data: {
        currency: "ron",
        unit_amount: 100000,
        product_data: {
          name: "Petrecere Privata",
        },
      },
      quantity: 1,
    })
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: productData,
    success_url: "https://zatun-blitz.vercel.app/checkout/succes?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://zatun-blitz.vercel.app",
  })

  const bookingId = await db.booking.findFirst({
    where: { userId: ctx.session.userId },
    orderBy: { id: "desc" },
  })

  const updateBooking = await db.booking.update({
    where: { id: bookingId?.id },
    data: { stripeSessionId: session.id },
  })

  return {
    sessionId: session.id,
  }
}
