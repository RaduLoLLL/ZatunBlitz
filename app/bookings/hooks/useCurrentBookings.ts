import { useQuery } from "blitz"
import getAllBookings from "../queries/getAllBookings"
import format from "date-fns/format"

export const useCurrentBookings = (startDate) => {
  const [booking] = useQuery(getAllBookings, format(startDate, "yyyy-MM-dd")) // Here I query the database
  return booking
}
