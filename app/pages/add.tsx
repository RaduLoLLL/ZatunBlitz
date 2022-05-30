import { BlitzPage, invoke, useRouter, useSession, getSession } from "blitz"
import { useState, useEffect, Suspense } from "react"

import { UserInfo } from "app/pages"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import addDays from "date-fns/addDays"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import insertBooking from "app/bookings/mutations/insertBooking"
import { useCurrentBookings } from "app/bookings/hooks/useCurrentBookings"

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
    locPescuit: 0,
    casuta: 0,
    sezlong: 0,
    sedintaFoto: false,
    petrecerePrivata: false,
    totalPrice: 20,
  })
  //Date state added separately
  const [startDate, setStartDate] = useState(addDays(new Date(), 1))

  const PescuitSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const totalFishingSpots = Array.from(Array(115).keys())
    const availableFishingSpots = totalFishingSpots.filter(
      (o1) => !bookings.some((o2) => o1 === o2.loc_pescuit)
    )
    return (
      <select
        name="locPescuit"
        value={state.locPescuit}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={0} key={0}>
          Alege Locul Preferat
        </option>
        {availableFishingSpots.map((value) => {
          return (
            <>
              <option value={value} key={value}>
                {value}
              </option>
            </>
          )
        })}
      </select>
    )
  }

  const CasutaSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const totalCasuta = Array.from(Array(19).keys())
    const availableCasuta = totalCasuta.filter((o1) => !bookings.some((o2) => o1 === o2.casuta))
    return (
      <select
        name="casuta"
        value={state.casuta}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={0} key={0}>
          Alege Casuta Preferata
        </option>
        {availableCasuta.map((value) => {
          return (
            <option value={value} key={value}>
              {value}
            </option>
          )
        })}
      </select>
    )
  }

  const SezlongSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const totalCasuta = Array.from(Array(22).keys())
    const availableCasuta = totalCasuta.filter((o1) => !bookings.some((o2) => o1 === o2.sezlong))
    return (
      <select
        name="sezlong"
        value={state.sezlong}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={0} key={0}>
          Alege Sezlongul Preferat
        </option>
        {availableCasuta.map((value) => {
          return (
            <option value={value} key={value}>
              {value}
            </option>
          )
        })}
      </select>
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

        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Petrecere Privata
        </span>
      </label>
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
      (state.casuta ? 100 : 0) +
      (state.locPescuit ? 50 : 0) +
      (state.sedintaFoto ? 100 : 0) +
      (state.sezlong ? 15 : 0)

    state.totalPrice = totalPrice
    console.log(totalPrice)
  }, [state])

  type booking = {
    starts_at: Date
    ends_at: Date
    intrare_complex: number
    loc_parcare: number
    loc_pescuit: number
    casuta: number
    sezlong: number
    sedinta_foto: boolean
    petrecere_privata: boolean
    total_price: number
  }

  // Here I handle the submit. "petrecerePrivata" means a private party. If that is checked
  // it does something, if not, something else

  async function handleSubmit(event) {
    event.preventDefault()
    if (state.petrecerePrivata === true) {
      setState({
        ...state,
        intrare: 0,
        locParcare: 0,
        locPescuit: 0,
        casuta: 0,
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
        loc_pescuit: state.locPescuit,
        casuta: state.casuta,
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
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value
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
        <div className="my-10 p-4  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Fa o rezervare noua
            </h5>
            {state.petrecerePrivata ? (
              <>
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
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
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Bilete Agrement
                  </label>
                  <input
                    type="number"
                    name="intrare"
                    id="intrare"
                    placeholder="1"
                    value={state.intrare}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="loParcare"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Numar Locuri de Parcare
                  </label>
                  <input
                    type="number"
                    name="locParcare"
                    id="locParcare"
                    placeholder="0"
                    min="0"
                    value={state.locParcare}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="locPescuit"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                  <label
                    htmlFor="casuta"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
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
                    htmlFor="sezlong"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sezlong
                  </label>
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex justify-center items-center">
                        <div className="ping"></div>
                      </div>
                    }
                  >
                    <SezlongSelect />
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

                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Sedinta foto
                    </span>
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
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
