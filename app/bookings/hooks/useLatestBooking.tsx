import { useQuery } from "blitz"
import getLatestBooking from "../queries/getLatestBooking"

export const useLatestBooking = () => {
  const [booking] = useQuery(getLatestBooking, undefined) // Here I query the database
  return booking
}
