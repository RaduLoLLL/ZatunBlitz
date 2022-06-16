import { BlitzPage, invoke, useRouter, useSession, getSession } from "blitz"
import { useState, useEffect, Suspense } from "react"
import Multiselect from "multiselect-react-dropdown"
import { UserInfo } from "app/pages"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import addDays from "date-fns/addDays"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Select from "react-select"
import insertBooking from "app/bookings/mutations/insertBooking"
import { useCurrentBookings } from "app/bookings/hooks/useCurrentBookings"
import toast from "react-hot-toast"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (!session.userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Add: BlitzPage = () => {
  const router = useRouter()

  //State for all options that will be added for the booking
  const [state, setState] = useState({
    intrare: 0,
    locParcare: 0,
    locPescuit: [],
    casuta: [],
    foisorMare: false,
    foisorMic: [],
    sezlong: 0,
    sedintaFoto: false,
    petrecerePrivata: false,
    totalPrice: 0,
  })
  const [availableSezlong, setAvailableSezlong] = useState(21)
  //Date state added separately
  const [startDate, setStartDate] = useState(addDays(new Date(), 1))

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

    const totalCasuta = [...Array(12).keys()].map((x) => x + 2)

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

  const FoisorMic = () => {
    const bookings = useCurrentBookings(startDate)

    const totalCasuta = [...Array(4).keys()].map((x) => x + 1)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.foisor_mic.length) {
        spotsArray.push(booking.foisor_mic)
      }
    })
    const occupiedFoisorMic = [].concat.apply([], spotsArray)

    const availableFoisorMic = totalCasuta.filter((x) => !occupiedFoisorMic.includes(x))

    type option = {
      value: Number
      label: string
    }

    const options: option[] = []
    availableFoisorMic.map((spot) => options.push({ value: spot, label: spot.toString() }))
    return (
      <>
        <Select
          isMulti
          name="foisorMic"
          //@ts-ignore
          options={options}
          value={state.foisorMic}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          classNamePrefix="select"
          placeholder="Alege foisorul mic preferat"
          onChange={(selectedOptionObj) => {
            //@ts-ignore
            setState({ ...state, foisorMic: selectedOptionObj })
          }}
        />
        <p className="text-sm text-gray-400 mt-2 font-bold">
          ! Include 8 bilete de intrare in complex !
        </p>
      </>
    )
  }

  const SezlongSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const available =
      21 - bookings.map((booking) => booking.sezlong).reduce((partialSum, a) => partialSum + a, 0)
    setAvailableSezlong(available)

    console.log("Sezlong disponibil", available)

    // const totalCasuta = Array.from(Array(22).keys())
    // const availableCasuta = totalCasuta.filter((o1) => !bookings.some((o2) => o1 === o2.sezlong))
    return (
      // <select
      //   name="sezlong"
      //   value={state.sezlong}
      //   onChange={handleChange}
      //   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      // >
      //   <option value={0} key={0}>
      //     Alege Sezlongul Preferat
      //   </option>
      //   {availableCasuta.map((value) => {
      //     return (
      //       <option value={value} key={value}>
      //         {value}
      //       </option>
      //     )
      //   })}
      // </select>

      <></>
    )
  }

  const PetrecerePrivata = () => {
    const bookings = useCurrentBookings(startDate)

    if (bookings.length > 0) return <div></div>

    return (
      <label
        htmlFor="petrecerePrivata"
        className="relative inline-flex items-center mb-4 cursor-pointer"
      >
        <input
          type="checkbox"
          name="petrecerePrivata"
          id="petrecerePrivata"
          className="sr-only peer"
          checked={state.petrecerePrivata}
          onChange={handleChange}
        />

        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 ">Petrecere Privata</span>
      </label>
    )
  }

  const FoisorMare = () => {
    const bookings = useCurrentBookings(startDate)

    const availableFoisorMare = bookings.map((booking) => {
      booking.foisor_mare ? true : false
    })

    if (availableFoisorMare.length > 0) return <></>

    return (
      <>
        <label htmlFor="foisorMare" className="block mb-2 text-sm font-medium text-gray-900 ">
          Foisor Mare
        </label>
        <label
          htmlFor="foisorMare"
          className="relative inline-flex items-center mb-2 cursor-pointer"
        >
          <input
            type="checkbox"
            name="foisorMare"
            id="foisorMare"
            className="sr-only peer"
            checked={state.foisorMare}
            onChange={handleChange}
          />

          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 ">Foisor Mare</span>
        </label>
        <p className="text-sm text-gray-400 font-bold">
          ! Include 20 de bilete de intrare in complex !
        </p>
      </>
    )
  }

  // Date state handler
  const handleDate = (date) => {
    setStartDate(date)
  }

  // Update the price as soon as any of the options changed
  useEffect(() => {
    const totalPrice =
      state.intrare * 20 +
      state.locParcare * 5 +
      (state.casuta.length > 0 ? 100 * state.casuta.length : 0) +
      (state.locPescuit.length > 0 ? 50 * state.locPescuit.length : 0) +
      (state.sedintaFoto ? 100 : 0) +
      state.sezlong * 15 +
      (state.foisorMare ? 200 : 0) +
      (state.foisorMic.length > 0 ? 80 * state.foisorMic.length : 0)

    state.totalPrice = totalPrice
  }, [state])

  type booking = {
    starts_at: Date
    ends_at: Date
    intrare_complex: number
    loc_parcare: number
    loc_pescuit: number[]
    casuta: number[]
    sezlong: number
    sedinta_foto: boolean
    petrecere_privata: boolean
    total_price: number
    foisor_mare: boolean
    foisor_mic: number[]
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

    const foisorMic: any[] = []
    state.foisorMic.map((loc: loc) => {
      foisorMic.push(loc.value)
    })
    if (state.petrecerePrivata === true) {
      setState({
        ...state,
        intrare: 0,
        locParcare: 0,
        locPescuit: [],
        casuta: [],
        sezlong: 0,
        sedintaFoto: false,
        totalPrice: 100,
      })
    } else {
      const booking: booking = {
        starts_at: startDate,
        ends_at: addDays(startDate, 1),
        intrare_complex: state.intrare,
        loc_parcare: state.locParcare,
        loc_pescuit: locuri_pescuit,
        casuta: casute,
        foisor_mic: foisorMic,
        foisor_mare: state.foisorMare,
        sezlong: state.sezlong,
        sedinta_foto: state.sedintaFoto,
        petrecere_privata: state.petrecerePrivata,
        total_price: state.totalPrice,
      }

      invoke(insertBooking, booking) // Insert the new created booking into the database
    }
    router.push("/checkout")
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
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <div className="ping"></div>
          </div>
        }
      >
        <UserInfo />
      </Suspense>

      <div className="mx-auto max-w-xs lg:max-w-md ">
        <div className="my-10 p-4  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 ">Fa o rezervare noua</h5>
            {state.petrecerePrivata ? (
              <>
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Alege Data
                  </label>
                  <div className="border-2 rounded">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => handleDate(date)}
                      dateFormat="dd/MM/yyyy"
                      includeDateIntervals={[{ start: new Date(), end: addDays(new Date(), 30) }]}
                      className="cursor-pointer p-2"
                    />
                  </div>
                </div>
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <PetrecerePrivata />
                </Suspense>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Alege Data
                  </label>
                  <div className="border-2 rounded">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      includeDateIntervals={[{ start: new Date(), end: addDays(new Date(), 30) }]}
                      className="cursor-pointer p-2"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="intrare"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Bilete Agrement
                  </label>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    name="intrare"
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
                    min="0"
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

                <div>
                  <label
                    htmlFor="foisorMic"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Foisor Mic
                  </label>
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex justify-center items-center">
                        <div className="ping"></div>
                      </div>
                    }
                  >
                    <FoisorMic />
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
                    <SezlongSelect />
                  </Suspense>
                  <div>
                    <label
                      htmlFor="sezlong"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Numar Sezlonguri
                    </label>
                    <input
                      type="number"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      max={availableSezlong}
                      min={0}
                      name="sezlong"
                      id="sezlong"
                      placeholder="1"
                      value={state.sezlong}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                    <p className="text-sm text-gray-400 font-bold">
                      Locuri disponibile in data aleasa: {availableSezlong}
                    </p>
                  </div>
                </div>

                <div>
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex justify-center items-center">
                        <div className="ping"></div>
                      </div>
                    }
                  >
                    <FoisorMare />
                  </Suspense>
                </div>

                <div>
                  <label
                    htmlFor="sedintaFoto"
                    className="relative inline-flex items-center mb-4 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="sedintaFoto"
                      id="sedintaFoto"
                      className="sr-only peer"
                      checked={state.sedintaFoto}
                      onChange={handleChange}
                    />

                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 ">Sedinta foto</span>
                  </label>
                </div>
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <PetrecerePrivata />
                </Suspense>
              </>
            )}

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
export default Add
