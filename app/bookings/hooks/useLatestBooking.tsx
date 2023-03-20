import { useQuery } from "blitz"
import getLatestBooking from "../queries/getLatestBooking"

export const useLatestBooking = (booking_id) => {
  console.log("UseLatestBooking")
  const [booking] = useQuery(getLatestBooking, booking_id) // Here I query the database
  return booking
}
