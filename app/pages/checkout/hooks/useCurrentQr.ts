import { useQuery } from "blitz"
import format from "date-fns/format"
import getQrInfo from "../queries/getQrInfo"

export const useCurrentQr = (orderId) => {
  const [booking] = useQuery(getQrInfo, orderId) // Here I query the database
  return booking
}
