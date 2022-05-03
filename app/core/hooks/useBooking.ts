import { useQuery } from "blitz"
import getBooking from "app/queries/getBooking"

export const useBooking = () => {
  const [booking] = useQuery(getBooking, undefined)
  return booking
}
