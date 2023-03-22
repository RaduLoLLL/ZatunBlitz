import { BlitzPage, getSession, Routes, useQuery } from "blitz"
import { Suspense, useState } from "react"
import Sidebar from "../../../components/Sidebar"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import subDays from "date-fns/subDays"
import { format } from "date-fns"
import getBookingsByDate from "./queries/getBookingsByDate"
import getBookingsByDateOnline from "./queries/getBookingsByDateOnline"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "ADMIN" && session.role != "CONTABIL") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Analiza: BlitzPage = () => {
  const [startDate, setStartDate] = useState(new Date())
  const RezervariDirecte = () => {
    const result = useQuery(getBookingsByDate, format(startDate, "yyyy-MM-dd"))
    const bookings = result[0]
    let locuri_pescuit = 0
    let casute = 0
    let agrement = 0
    let parcare = 0
    bookings.map((booking, i) => {
      locuri_pescuit += booking.loc_pescuit.length
      casute += booking.casuta.length
      agrement += booking.intrare_complex
      parcare += booking.loc_parcare
    })

    return (
      <>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex space-y-6 flex-col">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {locuri_pescuit}
                </span>
                <h3 className="text-base font-normal text-gray-500">Locuri pescuit</h3>
              </div>
              <div>{locuri_pescuit * 75}Lei</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {casute}
                </span>
                <h3 className="text-base font-normal text-gray-500">Casute</h3>
              </div>
              <div>{casute * 93.42}Lei</div>
            </div>
            <div className="flex items-center justify-between  ">
              <div>
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {agrement}
                </span>
                <h3 className="text-base font-normal text-gray-500">Bilete agrement</h3>
              </div>
              <div>{agrement * 15}Lei</div>
            </div>
            <div className="flex items-center justify-between  ">
              <div>
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {parcare}
                </span>
                <h3 className="text-base font-normal text-gray-500">Locuri parcare</h3>
              </div>
              <div>{parcare * 10}Lei</div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const IncasariDirecte = () => {
    const result = useQuery(getBookingsByDate, format(startDate, "yyyy-MM-dd"))
    const bookings = result[0]

    let TotalPrice = 0
    bookings.map((booking, i) => {
      TotalPrice += booking.total_price
    })

    return (
      <>
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {TotalPrice} Lei
          </span>
          <h3 className="text-base font-normal text-gray-500">Incasati Direct</h3>
        </div>
      </>
    )
  }

  const RezervariOnline = () => {
    const result = useQuery(getBookingsByDateOnline, format(startDate, "yyyy-MM-dd"))
    const bookings = result[0]
    let locuri_pescuit = 0
    let casute = 0
    let agrement = 0
    let parcare = 0
    bookings.map((booking, i) => {
      locuri_pescuit += booking.loc_pescuit.length
      casute += booking.casuta.length
      agrement += booking.intrare_complex
      parcare += booking.loc_parcare
    })
    return (
      <>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex space-y-6 flex-col">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {locuri_pescuit}
                </span>
                <h3 className="text-base font-normal text-gray-500">Locuri pescuit</h3>
              </div>
              <div>{locuri_pescuit * 75}Lei</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {casute}
                </span>
                <h3 className="text-base font-normal text-gray-500">Casute</h3>
              </div>
              <div>{casute * 93.42}Lei</div>
            </div>
            <div className="flex items-center justify-between  ">
              <div>
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {agrement}
                </span>
                <h3 className="text-base font-normal text-gray-500">Bilete agrement</h3>
              </div>
              <div>{agrement * 15}Lei</div>
            </div>
            <div className="flex items-center justify-between  ">
              <div>
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {parcare}
                </span>
                <h3 className="text-base font-normal text-gray-500">Locuri parcare</h3>
              </div>
              <div>{parcare * 10}Lei</div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const IncasariOnline = () => {
    console.log("Client date", new Date(startDate))
    const result = useQuery(getBookingsByDateOnline, format(startDate, "yyyy-MM-dd"))
    const bookings = result[0]

    let TotalPrice = 0
    bookings.map((booking, i) => {
      TotalPrice += booking.total_price
    })

    return (
      <>
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {TotalPrice.toFixed(2)} Lei
          </span>
          <h3 className="text-base font-normal text-gray-500">Incasati Online</h3>
        </div>
      </>
    )
  }
  const AnalizaComponent = () => {
    return (
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
              includeDateIntervals={[{ start: subDays(new Date(), 30), end: new Date() }]}
              className="cursor-pointer p-2"
            />
          </div>
        </div>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          <Suspense
            fallback={
              <div className="min-h-screen flex justify-center items-center">
                <div className="ping"></div>
              </div>
            }
          >
            <RezervariDirecte />
          </Suspense>

          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <Suspense
                fallback={
                  <div className="min-h-screen flex justify-center items-center">
                    <div className="ping"></div>
                  </div>
                }
              >
                <IncasariDirecte />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          <Suspense
            fallback={
              <div className="min-h-screen flex justify-center items-center">
                <div className="ping"></div>
              </div>
            }
          >
            <RezervariOnline />
          </Suspense>

          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <Suspense
                fallback={
                  <div className="min-h-screen flex justify-center items-center">
                    <div className="ping"></div>
                  </div>
                }
              >
                <IncasariOnline />
              </Suspense>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="flex overflow-hidden bg-white pt-16">
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <div className="ping"></div>
          </div>
        }
      >
        <Sidebar />
      </Suspense>
      <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
      <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        <main>
          <div className="pt-6 px-4 min-h-screen">
            <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4 ">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                <Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center items-center">
                      <div className="ping"></div>
                    </div>
                  }
                >
                  <AnalizaComponent />
                </Suspense>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

Analiza.authenticate = { redirectTo: Routes.Home() }
export default Analiza
