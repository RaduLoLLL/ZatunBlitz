import { useCurrentBookings } from "app/bookings/hooks/useCurrentBookings"
import insertBooking from "app/bookings/mutations/insertBooking"
import { invoke, useMutation, useRouter, useSession } from "blitz"
import { addDays, set, subDays } from "date-fns"
import { Suspense, useEffect, useState } from "react"
import toast from "react-hot-toast"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import insertBlockedDates from "../mutations/insertBlockedDates"

const BlockedForm = () => {
  // Date state added separately
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [blockedDates, setBlockedDates] = useState([subDays(new Date(), 30)])

  async function handleSubmit(event) {
    event.preventDefault()

    const toastId = toast.loading("Se blochează datele selectate")

    await invoke(insertBlockedDates, { startDate: startDate, endDate: endDate, blockedDates }).then(
      () => {
        toast.success("Datele au fost blocate cu succes", { id: toastId })
      }
    )

    setStartDate(null)
    setEndDate(null)
    setBlockedDates([])
  }

  const onChange = (date) => {
    // Create a new array with the existing blockedDates
    const updatedBlockedDates = [...blockedDates]

    // Check if the date exists already and remove it if it does.
    // If it does not exist already, add it to the updatedBlockedDates array
    const containsDate = updatedBlockedDates.some(
      (blockedDate) => blockedDate.getTime() === date.getTime()
    )

    if (containsDate) {
      // If the date is already in the array, remove it
      const index = updatedBlockedDates.findIndex(
        (blockedDate) => blockedDate.getTime() === date.getTime()
      )
      updatedBlockedDates.splice(index, 1)
    } else {
      // If the date is not in the array, add it
      updatedBlockedDates.push(date)
    }

    // Update the state with the new array of blocked dates
    setBlockedDates(updatedBlockedDates.sort((a, b) => a.getTime() - b.getTime()))
  }

  return (
    <>
      <div className="mx-auto max-w-xs lg:max-w-md ">
        <div className="my-10 p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 ">
              Alege datele pentru blocarea permanentă
            </h5>

            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 text-center"
              >
                Alege Data
              </label>
              <div className="rounded w-full flex justify-center">
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  highlightDates={blockedDates}
                  inline
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Blochează
            </button>

            {/* Display blocked dates */}
            <div className="mt-4">
              {blockedDates.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-900">Date blocate:</h5>
                  <ul>
                    {blockedDates.map((date, index) => (
                      <li key={index}>{date.toLocaleDateString()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default BlockedForm
