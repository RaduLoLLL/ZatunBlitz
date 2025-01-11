import db from "db"
import { Ctx, invoke } from "blitz"
const axios = require("axios")
import axiosRetry from "axios-retry"
import getUser from "app/pages/mutations/getUserById"

export default async function confirmOrderPaid({ orderId, booking_id, orderNumber }, ctx: Ctx) {
  const intBookingId = parseInt(booking_id)
  const booking = await db.booking.findFirst({ where: { id: intBookingId } })
  const user = await invoke(getUser, booking?.userId)
  const bt_username = process.env.BT_USERNAME
  const bt_password = process.env.BT_PASSWORD
  const bt_url = process.env.BT_URL
  const oblio_client_id = process.env.CLIENT_ID
  const oblio_secret = process.env.OBLIO_SECRET
  const oblio_auth_url = "https://www.oblio.eu/api/authorize/token"
  const oblio_invoice_url = "https://www.oblio.eu/api/docs/invoice" // URL for Oblio API

  const urlencodedPayload = orderId
    ? `userName=${bt_username}&password=${bt_password}&orderId=${orderId}&orderNumber=${orderNumber}`
    : `userName=${bt_username}&password=${bt_password}&orderNumber=${orderNumber}`
  axiosRetry(axios, { retries: 15 })

  const orderStatus = await axios.post(
    `${bt_url}/payment/rest/getOrderStatusExtended.do`,
    urlencodedPayload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  if (orderStatus.data.orderStatus === 2) {
    await db.booking.update({
      where: { id: booking?.id },
      data: { paid: true },
    })
    if (booking?.invoiceLink) {
      return {
        success: true,
        link: booking.invoiceLink, // Return the existing invoice link
      }
    }

    type Product = {
      name: string
      price: number
      quantity: number
    }
    const products: Product[] = []
    let oblioAccessToken = ""
    try {
      const authResponse = await axios.post(
        oblio_auth_url,
        `client_id=${oblio_client_id}&client_secret=${oblio_secret}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      oblioAccessToken = authResponse.data?.access_token
      if (!oblioAccessToken) {
        throw new Error("Failed to retrieve Oblio access token")
      }
    } catch (error) {
      console.error("Error generating Oblio access token:", error)
      return false
    }

    if (booking?.intrare_complex) {
      products.push({
        name: "Intrare Agrement",
        price: 15,
        quantity: booking.intrare_complex,
      })
    }

    if (booking?.loc_parcare) {
      products.push({
        name: "Loc Parcare",
        price: 10,
        quantity: booking.loc_parcare,
      })
    }

    if (booking?.loc_pescuit?.length) {
      products.push({
        name: "Loc Pescuit",
        price: 75,
        quantity: booking.loc_pescuit.length,
      })
    }

    if (booking?.casuta?.length) {
      products.push({
        name: "Căsuță Zatun",
        price: 95,
        quantity: booking.casuta.length,
      })
    }

    if (booking?.casuta2?.length) {
      products.push({
        name: "Căsuță Zatun 2",
        price: 130,
        quantity: booking.casuta2.length,
      })
    }
    const invoiceData = {
      cif: process.env.COMPANY_CIF,
      client: {
        name: user?.name,
        cif: user?.cnp,
        address: "Galati",
        state: "Galati",
        country: "Romania",
        city: "Galati",
        email: user?.email,
        phone: user?.phone,
      },
      seriesName: "Z",
      products,
      deliveryDate: booking?.createdAt,
      collectDate: booking?.createdAt,
      collect: {
        type: "Card", // Adjust based on your requirements
        value: booking?.total_price,
        documentNumber: booking_id,
      },
    }
    try {
      const invoiceResponse = await axios.post(oblio_invoice_url, invoiceData, {
        headers: {
          Authorization: `Bearer ${oblioAccessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (invoiceResponse.status === 200) {
        console.log("Invoice successfully generated:", invoiceResponse.data)
        await db.booking.update({
          where: { id: booking?.id },
          data: { invoiceLink: invoiceResponse.data.data?.link },
        })
        return {
          success: true,
          link: invoiceResponse.data.data?.link,
        }
      } else {
        console.error("Failed to generate invoice:", invoiceResponse.data)
      }
    } catch (error) {
      console.error("Error while generating invoice:", error)
    }
  }

  return orderStatus?.data?.orderStatus === 2 || false
}
