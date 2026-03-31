import { useCurrentBookings } from "app/bookings/hooks/useCurrentBookings"

import { invoke, useRouter, useSession } from "blitz"
import { addDays, addHours, subDays } from "date-fns"
import { Suspense, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import insertBookingPaid from "../dashboard/adauga/mutations/insertBookingPaid"

const ReservationForm = () => {
  //State for all options that will be added for the booking
  const initialState = {
    intrare: 0,
    locParcare: 0,
    locPescuit: [],
    casuta: [],
    casuta2: [],
    foisormic: [],
    foisormare: [],
    foisormic2: [],
    foisormare2: [],
    totalPrice: 0,
  }
  const [state, setState] = useState(initialState)
  //Date state added separately

  const [startDate, setStartDate] = useState(addHours(new Date(), 3))

  const PescuitSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const totalFishingSpots = [...Array(124).keys()].map((x) => x + 1)

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
  const CasutaSelect2 = () => {
    const bookings = useCurrentBookings(startDate)

    const totalCasuta = [...Array(9).keys()].map((x) => x + 1)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.casuta2.length) {
        spotsArray.push(booking.casuta2)
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
        value={state.casuta2}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        classNamePrefix="select"
        placeholder="Alege casuta preferata din complexul Zatun 2"
        onChange={(selectedOptionObj) => {
          //@ts-ignore
          setState({ ...state, casuta2: selectedOptionObj })
        }}
      />
    )
  }
  const FoisorMicSelect = () => {
    const bookings = useCurrentBookings(startDate)
    console.log("Rezervari:", bookings)

    const totalSpots = [...Array(4).keys()].map((x) => x + 1)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.foisormic.length) {
        spotsArray.push(booking.foisormic)
      }
    })
    spotsArray.push([])
    const ocuppiedSpots = [].concat.apply([], spotsArray)
    console.log("Foisor mic ocupate:", ocuppiedSpots)
    const availableSpots = totalSpots.filter((x) => !ocuppiedSpots.includes(x))

    type option = {
      value: Number
      label: string
    }

    const options: option[] = []
    availableSpots.map((spot) => options.push({ value: spot, label: spot.toString() }))

    return (
      <>
        <label htmlFor="locPescuit" className="block mb-2 text-sm font-medium text-gray-900 ">
          Foisor Mic Zatun 1 - 8 persoane
        </label>
        <Select
          isMulti
          name=" foisormic"
          //@ts-ignore
          options={options}
          value={state.foisormic}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          classNamePrefix="select"
          placeholder="Alege locul preferat"
          onChange={(selectedOptionObj) => {
            //@ts-ignore
            setState({ ...state, foisormic: selectedOptionObj })
          }}
        />
      </>
    )
  }
  const FoisorMareSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const totalSpots = [...Array(1).keys()].map((x) => x + 1)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.foisormare.length) {
        spotsArray.push(booking.foisormare)
      }
    })
    spotsArray.push([])
    const ocuppiedSpots = [].concat.apply([], spotsArray)

    const availableSpots = totalSpots.filter((x) => !ocuppiedSpots.includes(x))

    type option = {
      value: Number
      label: string
    }

    const options: option[] = []
    availableSpots.map((spot) => options.push({ value: spot, label: spot.toString() }))

    return (
      <>
        <Select
          isMulti
          name=" foisormare"
          //@ts-ignore
          options={options}
          value={state.foisormare}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          classNamePrefix="select"
          placeholder="Alege locul preferat"
          onChange={(selectedOptionObj) => {
            //@ts-ignore
            setState({ ...state, foisormare: selectedOptionObj })
          }}
        />
      </>
    )
  }
  const FoisorMicSelect2 = () => {
    const bookings = useCurrentBookings(startDate)

    const totalSpots = [...Array(2).keys()].map((x) => x + 1)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.foisormic2.length) {
        spotsArray.push(booking.foisormic2)
      }
    })
    spotsArray.push([])
    const ocuppiedSpots = [].concat.apply([], spotsArray)

    const availableSpots = totalSpots.filter((x) => !ocuppiedSpots.includes(x))

    type option = {
      value: Number
      label: string
    }

    const options: option[] = []
    availableSpots.map((spot) => options.push({ value: spot, label: spot.toString() }))

    return (
      <>
        <Select
          isMulti
          name=" foisormic2"
          //@ts-ignore
          options={options}
          value={state.foisormic2}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          classNamePrefix="select"
          placeholder="Alege locul preferat"
          onChange={(selectedOptionObj) => {
            //@ts-ignore
            setState({ ...state, foisormic2: selectedOptionObj })
          }}
        />
      </>
    )
  }
  const FoisorMareSelect2 = () => {
    const bookings = useCurrentBookings(startDate)

    const totalSpots = [...Array(1).keys()].map((x) => x + 1)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.foisormare2.length) {
        spotsArray.push(booking.foisormare2)
      }
    })
    spotsArray.push([])
    const ocuppiedSpots = [].concat.apply([], spotsArray)

    const availableSpots = totalSpots.filter((x) => !ocuppiedSpots.includes(x))

    type option = {
      value: Number
      label: string
    }

    const options: option[] = []
    availableSpots.map((spot) => options.push({ value: spot, label: spot.toString() }))

    return (
      <>
        <Select
          isMulti
          name=" foisormare2"
          //@ts-ignore
          options={options}
          value={state.foisormare2}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          classNamePrefix="select"
          placeholder="Alege locul preferat"
          onChange={(selectedOptionObj) => {
            //@ts-ignore
            setState({ ...state, foisormare2: selectedOptionObj })
          }}
        />
      </>
    )
  }

  const CalculatePrice = () => {
    const totalPrice =
      state.intrare * 15 +
      state.locParcare * 10 +
      (state.casuta.length > 0 ? 95 * state.casuta.length : 0) +
      (state.casuta2.length > 0 ? 130 * state.casuta2.length : 0) +
      (state.locPescuit.length > 0 ? 75 * state.locPescuit.length : 0) +
      (state.foisormic.length > 0 ? 120 * state.foisormic.length : 0) +
      (state.foisormare.length > 0 ? 300 * state.foisormare.length : 0) +
      (state.foisormic2.length > 0 ? 210 * state.foisormic2.length : 0) +
      (state.foisormare2.length > 0 ? 450 * state.foisormare2.length : 0)
    return (
      <>
        <p className="my-6 font-bold">Pret total: {totalPrice.toFixed(2)} Lei</p>
      </>
    )
  }
  // Update the price as soon as any of the options changed
  useEffect(() => {
    const totalPrice =
      state.intrare * 15 +
      state.locParcare * 10 +
      (state.casuta.length > 0 ? 95 * state.casuta.length : 0) +
      (state.casuta2.length > 0 ? 130 * state.casuta2.length : 0) +
      (state.locPescuit.length > 0 ? 75 * state.locPescuit.length : 0) +
      (state.foisormic.length > 0 ? 120 * state.foisormic.length : 0) +
      (state.foisormare.length > 0 ? 300 * state.foisormare.length : 0) +
      (state.foisormic2.length > 0 ? 210 * state.foisormic2.length : 0) +
      (state.foisormare2.length > 0 ? 450 * state.foisormare2.length : 0)
    state.totalPrice = totalPrice
  }, [state])

  type booking = {
    starts_at: Date
    ends_at: Date
    intrare_complex: number
    loc_parcare: number
    loc_pescuit: number[]
    casuta: number[]
    casuta2: number[]
    foisormic: number[]
    foisormare: number[]
    foisormic2: number[]
    foisormare2: number[]
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
    const casute2: any[] = []
    state.casuta2.map((loc: loc) => {
      casute2.push(loc.value)
    })
    const foisormic: any[] = []
    state.foisormic.map((loc: loc) => {
      foisormic.push(loc.value)
    })
    const foisormare: any[] = []
    state.foisormare.map((loc: loc) => {
      foisormare.push(loc.value)
    })
    const foisormic2: any[] = []
    state.foisormic2.map((loc: loc) => {
      foisormic2.push(loc.value)
    })
    const foisormare2: any[] = []
    state.foisormare2.map((loc: loc) => {
      foisormare2.push(loc.value)
    })

    const booking: booking = {
      starts_at: startDate,
      ends_at: addDays(startDate, 1),
      intrare_complex: state.intrare,
      loc_parcare: state.locParcare,
      loc_pescuit: locuri_pescuit,
      casuta: casute,
      casuta2: casute2,
      foisormic: foisormic,
      foisormare: foisormare,
      foisormic2: foisormic2,
      foisormare2: foisormare2,

      total_price: state.totalPrice,
    }

    await invoke(insertBookingPaid, booking) // Insert the new created booking into the database

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
                    onChange={(date) => {
                      setStartDate(date)
                    }}
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
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <FoisorMicSelect />
                </Suspense>
              </div>

              <div>
                <label
                  htmlFor="locPescuit"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Foisor Mare Zatun 1 - 20 de persoane
                </label>
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <FoisorMareSelect />
                </Suspense>
              </div>

              <div>
                <label
                  htmlFor="locPescuit"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Foisor Mic Zatun 2 - 14 persoane
                </label>
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <FoisorMicSelect2 />
                </Suspense>
              </div>

              <div>
                <label
                  htmlFor="locPescuit"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Foisor Mare Zatun 2 - 30 de persoane
                </label>
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <FoisorMareSelect2 />
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

              <div>
                <label htmlFor="casuta" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Casuta Zatun 2
                </label>
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <CasutaSelect2 />
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
