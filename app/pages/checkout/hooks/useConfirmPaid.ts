import { invoke, useMutation, useQuery } from "blitz"
import confirmOrderPaid from "../mutations/confirmOrderPaid"

export const useConfirmPaid = ({ orderId, booking_id }) => {
  const confirm = useQuery(confirmOrderPaid, { orderId, booking_id }) // Here I query the database
  return confirm
}
