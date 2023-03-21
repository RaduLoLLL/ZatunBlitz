import { useCurrentBookings } from "app/bookings/hooks/useCurrentBookings"

import { invoke, useRouter, useSession } from "blitz"
import { addDays, addHours, subDays } from "date-fns"
import { Suspense, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import insertBooking from "../dashboard/adauga/mutations/insertBooking"

const ReservationForm = () => {
  //State for all options that will be added for the booking
  const initialState = {
    intrare: 0,
    locParcare: 0,
    locPescuit: [],
    casuta: [],
    totalPrice: 0,
  }
  const [state, setState] = useState({
    intrare: 0,
    locParcare: 0,
    locPescuit: [],
    casuta: [],
    totalPrice: 0,
  })
  //Date state added separately
  const [startDate, setStartDate] = useState(addHours(new Date(), 2))

  const PescuitSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const totalFishingSpots = [...Array(114).keys()].map((x) => x + 1)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.loc_pescuit.length) {
        spotsArray.push(booking.loc_pescuit)
      }
    })
    const ocuppiedFishingSpots = [].concat.apply([], spotsArray)

    const availableFishingSpots = totalFishingSpots.filter((x) => !ocuppiedFishingSpots.includes(x))

    type option = {
      value: Number
      label: string
    }

    const options: option[] = []
    availableFishingSpots.map((spot) => options.push({ value: spot, label: spot.toString() }))

    // const availableFishingSpots = totalFishingSpots.filter(
    //   (o1) => !bookings.some((o2) => o1 === o2.loc_pescuit)
    // )
    return (
      <Select
        isMulti
        name="locPescuit"
        //@ts-ignore
        options={options}
        value={state.locPescuit}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        classNamePrefix="select"
        placeholder="Alege locul preferat"
        onChange={(selectedOptionObj) => {
          //@ts-ignore
          setState({ ...state, locPescuit: selectedOptionObj })
        }}
      />
    )
  }

  const CasutaSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const totalCasuta = [...Array(17).keys()].map((x) => x + 2)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.casuta.length) {
        spotsArray.push(booking.casuta)
      }
    })
    const occupiedCasuta = [].concat.apply([], spotsArray)

    const availableCasuta = totalCasuta.filter((x) => !occupiedCasuta.includes(x))

    type option = {
      value: Number
      label: string
    }

    const options: option[] = []
    availableCasuta.map((spot) => options.push({ value: spot, label: spot.toString() }))
    return (
      <Select
        isMulti
        name="locPescuit"
        //@ts-ignore
        options={options}
        value={state.casuta}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        classNamePrefix="select"
        placeholder="Alege casuta preferata"
        onChange={(selectedOptionObj) => {
          //@ts-ignore
          setState({ ...state, casuta: selectedOptionObj })
        }}
      />
    )
  }

  const CalculatePrice = () => {
    const totalPrice =
      state.intrare * 15 +
      state.locParcare * 10 +
      (state.casuta.length > 0 ? 93.42 * state.casuta.length : 0) +
      (state.locPescuit.length > 0 ? 75 * state.locPescuit.length : 0)
    return (
      <>
        <p className="my-6 font-bold">Pret total: {totalPrice} Lei</p>
      </>
    )
  }
  // Update the price as soon as any of the options changed
  useEffect(() => {
    const totalPrice =
      state.intrare * 15 +
      state.locParcare * 10 +
      (state.casuta.length > 0 ? 93.42 * state.casuta.length : 0) +
      (state.locPescuit.length > 0 ? 75 * state.locPescuit.length : 0)
    state.totalPrice = totalPrice
  }, [state])

  type booking = {
    starts_at: Date
    ends_at: Date
    intrare_complex: number
    loc_parcare: number
    loc_pescuit: number[]
    casuta: number[]
    total_price: number
  }

  // Here I handle the submit. "petrecerePrivata" means a private party. If that is checked
  // it does something, if not, something else

  async function handleSubmit(event) {
    type loc = {
      value: number
      label: string
    }
    event.preventDefault()

    if (state.totalPrice == 0) {
      toast.error("Nu ati introdus niciun camp. Rezervarea nu poate fi goala")
      return <></>
    }

    const locuri_pescuit: any[] = []
    state.locPescuit.map((loc: loc) => {
      locuri_pescuit.push(loc.value)
    })

    const casute: any[] = []
    state.casuta.map((loc: loc) => {
      casute.push(loc.value)
    })

    const booking: booking = {
      starts_at: startDate,
      ends_at: addDays(startDate, 1),
      intrare_complex: state.intrare,
      loc_parcare: state.locParcare,
      loc_pescuit: locuri_pescuit,
      casuta: casute,
      total_price: state.totalPrice,
    }

    await invoke(insertBooking, booking) // Insert the new created booking into the database

    toast.success("Rezervare adaugata cu succes")
    setState({ ...initialState })
    setStartDate(new Date())
  }

  // State handler for everything but the price, that updates in the useEffect
  const handleChange = (evt) => {
    const name = evt.target.name
    const value: number = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <>
      <div className="mx-auto max-w-xs lg:max-w-md ">
        <div className="my-10 p-4  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 ">
          <Suspense fallback="...">
            <CalculatePrice />
          </Suspense>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 ">Fa o rezervare noua</h5>
            <>
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Alege Data
                </label>
                <div className="border-2 rounded">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(addHours(date, 2))}
                    dateFormat="dd/MM/yyyy"
                    includeDateIntervals={[
                      { start: subDays(new Date(), 1), end: addDays(new Date(), 30) },
                    ]}
                    className="cursor-pointer p-2"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="intrare" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Bilete Agrement
                </label>
                <input
                  type="number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  name="intrare"
                  min={0}
                  id="intrare"
                  placeholder="1"
                  value={state.intrare}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="loParcare"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Numar Locuri de Parcare
                </label>
                <input
                  type="number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  name="locParcare"
                  id="locParcare"
                  placeholder="0"
                  min={0}
                  value={state.locParcare}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>

              <div>
                <label
                  htmlFor="locPescuit"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Loc de Pescuit
                </label>

                {
                  // Here I call that function inside a Suspense and things go south
                }
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <PescuitSelect />
                </Suspense>
              </div>

              <div>
                <label htmlFor="casuta" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Casuta
                </label>
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <CasutaSelect />
                </Suspense>
              </div>
            </>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Trimite
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ReservationForm
