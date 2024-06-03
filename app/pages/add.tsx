import {
  BlitzPage,
  invoke,
  useRouter,
  getSession,
  Image,
  Link,
  Routes,
  useQuery,
  useSession,
} from "blitz"
import { useState, useEffect, Suspense, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import addDays from "date-fns/addDays"
import Select from "react-select"
import insertBooking from "app/bookings/mutations/insertBooking"
import { useCurrentBookings } from "app/bookings/hooks/useCurrentBookings"
import toast from "react-hot-toast"
import {
  addHours,
  differenceInDays,
  differenceInHours,
  getHours,
  isAfter,
  isBefore,
  isSameDay,
  subDays,
} from "date-fns"
import Layout from "app/core/layouts/Layout"
import getLatestBlocked from "./dashboard/blocare-totala/queries/getLatestBlocked"
import deleteUnpaidBooking from "app/bookings/mutations/deleteUnpaidBooking"
import getDate from "./queries/getDate"

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
  const user = useSession()
  const date = useQuery(getDate, undefined)[0]
  useEffect(() => {
    invoke(deleteUnpaidBooking, user.userId)
  }, [])

  //State for all options that will be added for the booking
  const initialState = {
    intrare: 0,
    locParcare: 0,
    locPescuit: [],
    casuta: [],
    totalPrice: 0,
  }
  const [state, setState] = useState(initialState)

  type BlockedDates = {
    startDate: Date
    endDate: Date
    blockedDates: Date[]
  }
  const blockedDates: BlockedDates = useQuery(getLatestBlocked, undefined)[0][0] || {
    startDate: subDays(date, 30),
    endDate: subDays(date, 30),
    blockedDates: [subDays(new Date(), 30)],
  }

  //Date state added separately
  const today = new Date()

  // Declare firstAvailableDate as null initially
  let firstAvailableDate: Date | null = null
  let nextDate = today
  while (!firstAvailableDate) {
    nextDate = addDays(nextDate, 1) // Get the next day
    // Check if nextDate is not in the blockedDates array and is not today

    if (!blockedDates.blockedDates.some((date) => isSameDay(date, nextDate))) {
      firstAvailableDate = nextDate
    }
  }
  console.log("The first available date is:", firstAvailableDate)

  const [startDate, setStartDate] = useState(firstAvailableDate)

  const PescuitSelect = () => {
    const bookings = useCurrentBookings(startDate)

    const totalFishingSpots = [...Array(114).keys()].map((x) => x + 1)

    const spotsArray: any[] = []
    bookings.map((booking) => {
      if (booking.loc_pescuit.length) {
        spotsArray.push(booking.loc_pescuit)
      }
    })
    spotsArray.push([1, 2, 9, 10])
    const ocuppiedFishingSpots = [].concat.apply([], spotsArray)

    const availableFishingSpots = totalFishingSpots.filter((x) => !ocuppiedFishingSpots.includes(x))

    type option = {
      value: Number
      label: string
    }

    const options: option[] = []
    availableFishingSpots.map((spot) => options.push({ value: spot, label: spot.toString() }))

    const [isModalOpen, setIsModalOpen] = useState(false)
    function closeModal() {
      setIsModalOpen(false)
    }

    function openModal() {
      setIsModalOpen(true)
    }

    return (
      <>
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
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={openModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Vezi harta
          </button>
        </div>

        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full min-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="mt-2 flex justify-center">
                      <Image
                        src={"/Harta.webp"}
                        width={2000}
                        height={600}
                        alt="Harta cu locurile"
                      />
                    </div>

                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Revino la locuri
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
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
    const blockedSpots: Number[] = [2]
    availableCasuta.map((spot) =>
      blockedSpots.map(
        (blockedSpot) =>
          spot !== blockedSpot && options.push({ value: spot, label: spot.toString() })
      )
    )

    const [isModalOpen, setIsModalOpen] = useState(false)
    function closeModal() {
      setIsModalOpen(false)
    }

    function openModal() {
      setIsModalOpen(true)
    }

    return (
      <>
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

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={openModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Vezi harta
          </button>
        </div>

        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full min-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="mt-2 flex justify-center">
                      <Image
                        src={"/HartaCasute.webp"}
                        width={1704}
                        height={845}
                        alt="Harta cu casutele"
                      />
                    </div>

                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Revino la locuri
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }

  // Update the price as soon as any of the options changed
  useEffect(() => {
    const totalPrice =
      state.intrare * 15 +
      state.locParcare * 10 +
      (state.casuta.length > 0 ? 95 * state.casuta.length : 0) +
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

    if (differenceInHours(startDate, date) <= 24 && getHours(startDate) >= 18) {
      toast.error("Rezervarile pentru ziua urmatoare se fac pana la ora 18:00")
      return <></>
    }

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

    const toastId = toast.loading("Iti inregistram rezervarea...")
    // if (booking.casuta.length > 0) {
    //   toast.error("Momentan căsuțele nu sunt disponibile", {
    //     id: toastId,
    //     duration: 10000,
    //   })
    //   return
    // }

    await invoke(insertBooking, booking)
      .then(() => {
        toast.success("Rezervarea a fost inregistrata cu succes!", { id: toastId })
        router.push("/checkout")
      })
      .catch((err) => {
        toast.error(
          "Unul din locurile alese este deja ocupat. Te rugăm să reîncarci pagina și să încerci din nou!",
          { id: toastId, duration: 10000 }
        )
        setState(initialState)
      }) // Insert the new created booking into the database
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
  const CalculatePrice = () => {
    const totalPrice =
      state.intrare * 15 +
      state.locParcare * 10 +
      (state.casuta.length > 0 ? 95 * state.casuta.length : 0) +
      (state.locPescuit.length > 0 ? 75 * state.locPescuit.length : 0)
    return (
      <div className="flex justify-center">
        <p className="mb-6 font-bold">Pret total: {totalPrice.toFixed(2)} Lei</p>
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto max-w-xs lg:max-w-md ">
        <div className="my-10 p-4  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 ">
          <Suspense fallback="...">
            <CalculatePrice />
          </Suspense>
          <form className=" space-y-10" onSubmit={handleSubmit}>
            <>
              <div>
                <label htmlFor="date" className="block mb-2 text-lg font-bold text-gray-900 ">
                  Selectați data rezervării
                </label>
                <div className="border-2 rounded">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date)
                    }}
                    dateFormat="dd/MM/yyyy"
                    minDate={addHours(date, 24)}
                    maxDate={addDays(date, 12)}
                    excludeDates={blockedDates.blockedDates}
                    className="cursor-pointer p-2"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="intrare" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Taxa Agrement
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
              <div className="flex  mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  required
                  className="w-12 h-12 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm dark:text-gray-300 text-left"
                >
                  Sunt de acord cu Termenii si Conditiile de utilizare si cu Regulamentele din
                  cadrul complexului.{" "}
                  <Link href={Routes.TC()}>
                    <a className="font-bold text-blue-500">
                      Citeste termenii si conditiile si Regulamentul complexului
                    </a>
                  </Link>
                </label>
              </div>
              <div className="flex  mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  required
                  className="w-12 h-12 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="default-checkbox" className="ml-2 text-sm text-left text-red-500">
                  Am luat la cunoștință faptul că rezervarea nu poate fi anulată sau modificată. Am
                  verificat detaliile rezervării și sunt corecte.
                </label>
              </div>
            </>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Trimite
            </button>

            <p className="text-center">
              ** În urma finalizării rezervării, suma plătită nu poate fi returnată în cazul
              anulării rezervării.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
export default Add
Add.getLayout = (page) => <Layout title="Add">{page}</Layout>
