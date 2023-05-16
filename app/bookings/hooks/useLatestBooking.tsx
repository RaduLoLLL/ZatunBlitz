import { useQuery } from "blitz"
import getLatestBooking from "../queries/getLatestBooking"

export const useLatestBooking = (booking_id) => {
  const [booking] = useQuery(getLatestBooking, booking_id) // Here I query the database
  return booking
}
