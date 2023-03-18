import { invoke, useRouterQuery } from "blitz"
import React from "react"
import confirmOrderPaid from "./checkout/mutations/confirmOrderPaid"

const CheckPaid = async () => {
  const query = useRouterQuery()
  const orderId = query.orderId
  const booking_id = query.booking_id
  //const isPaid = await invoke(confirmOrderPaid, { orderId, booking_id })
  console.log(orderId)
}

export default CheckPaid
