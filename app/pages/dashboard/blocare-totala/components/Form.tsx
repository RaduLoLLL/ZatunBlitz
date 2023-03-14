import { useCurrentBookings } from "app/bookings/hooks/useCurrentBookings"
import insertBooking from "app/bookings/mutations/insertBooking"
import { invoke, useMutation, useRouter, useSession } from "blitz"
import { addDays, subDays } from "date-fns"
import { Suspense, useEffect, useState } from "react"
import toast from "react-hot-toast"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import insertBlockedDates from "../mutations/insertBlockedDates"

const BlockedForm = () => {
  //Date state added separately
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // Here I handle the submit. "petrecerePrivata" means a private party. If that is checked
  // it does something, if not, something else

  async function handleSubmit(event) {
    event.preventDefault()
    const toastId = toast.loading("Se blochează datele selectate")

    await invoke(insertBlockedDates, { startDate: startDate, endDate: endDate })
    toast.success("Datele au fost blocate cu succes", { id: toastId })
    setStartDate(null)
    setEndDate(null)
  }
  const onChange = (dates) => {
    const [start, end] = dates
    console.log(end)
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <>
      <div className="mx-auto max-w-xs lg:max-w-md ">
        <div className="my-10 p-4  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 ">
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
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
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
          </form>
        </div>
      </div>
    </>
  )
}

export default BlockedForm
