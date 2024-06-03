import { BlitzPage, getSession, Link, Routes, useQuery } from "blitz"
import { Suspense, useState } from "react"
import Sidebar from "../../../components/Sidebar"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import subDays from "date-fns/subDays"
import { addDays, format, subHours } from "date-fns"
import getBookingsByDate from "./queries/getBookingsByDate"
import getBookingsByStartDate from "./queries/getBookingsByStartDate"
import getBookingsByDateOnline from "./queries/getBookingsByDateOnline"
import { CheckCircleIcon } from "@heroicons/react/solid"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "ADMIN" && session.role != "PORTAR" && session.role != "SUPERADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}
type DateInterval = {
  startDate: string
  endDate: string
}
const Analiza: BlitzPage = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(addDays(new Date(), 1))
  const RezervariDirecte = () => {
    const result = useQuery(getBookingsByDate, {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })
    const bookings = result[0]
    let locuri_pescuit = 0
    let casute = 0
    let casute2 = 0
    let agrement = 0
    let parcare = 0
    bookings.map((booking, i) => {
      locuri_pescuit += booking.loc_pescuit.length
      casute += booking.casuta.length
      casute2 += booking.casuta2.length
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
              <div>{casute * 95}Lei</div>
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

  const LocuriOcupate = () => {
    const locuriRezervate = useQuery(getBookingsByStartDate, {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })

    const bookings = locuriRezervate[0]
    const locuriOcupate: { loc: number; nume: string; prezentat: boolean }[] = []

    bookings.map((booking, i) => {
      booking.loc_pescuit.map((loc) => {
        locuriOcupate.push({
          loc: loc,
          nume: booking?.User?.name + " " + (booking?.User?.surname || "") || "",
          prezentat: booking?.verificat,
        })
      })
    })

    // Sort the locuriOcupate array
    locuriOcupate.sort((a, b) => a.loc - b.loc)

    return (
      <div className="flex flex-wrap">
        {locuriOcupate.map((loc, i) => {
          return (
            <div
              key={i}
              className={`${
                loc.prezentat ? "bg-green-300 " : "bg-gray-300 "
              }rounded-full px-6 py-3 m-1 ml-0 h-20 w-40`}
            >
              <p className="font-bold">{loc.loc}</p>
              <p className="text-xs">{loc.nume}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const CasuteOcupate = () => {
    const locuriRezervate = useQuery(getBookingsByStartDate, {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })

    const bookings = locuriRezervate[0]
    const locuriOcupate: { loc: number; nume: string; prezentat: boolean }[] = []

    bookings.map((booking, i) => {
      booking.casuta.map((loc) => {
        locuriOcupate.push({
          loc: loc,
          nume: booking?.User?.name + " " + (booking?.User?.surname || "") || "",
          prezentat: booking?.verificat,
        })
      })
    })

    // Sort the locuriOcupate array
    locuriOcupate.sort((a, b) => a.loc - b.loc)

    return (
      <div className="flex flex-wrap">
        {locuriOcupate.map((loc, i) => {
          return (
            <div
              key={i}
              className={`${
                loc.prezentat ? "bg-green-300 " : "bg-gray-300 "
              }rounded-full px-6 py-3 m-1 ml-0 h-20 w-40`}
            >
              <p className="font-bold">{loc.loc}</p>
              <p className="text-xs">{loc.nume}</p>
            </div>
          )
        })}
      </div>
    )
  }
  const CasuteOcupate2 = () => {
    const locuriRezervate = useQuery(getBookingsByStartDate, {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })

    const bookings = locuriRezervate[0]
    const locuriOcupate: { loc: number; nume: string; prezentat: boolean }[] = []

    bookings.map((booking, i) => {
      booking.casuta2.map((loc) => {
        locuriOcupate.push({
          loc: loc,
          nume: booking?.User?.name + " " + (booking?.User?.surname || "") || "",
          prezentat: booking?.verificat,
        })
      })
    })

    // Sort the locuriOcupate array
    locuriOcupate.sort((a, b) => a.loc - b.loc)

    return (
      <div className="flex flex-wrap">
        {locuriOcupate.map((loc, i) => {
          return (
            <div
              key={i}
              className={`${
                loc.prezentat ? "bg-green-300 " : "bg-gray-300 "
              }rounded-full px-6 py-3 m-1 ml-0 h-20 w-40`}
            >
              <p className="font-bold">{loc.loc}</p>
              <p className="text-xs">{loc.nume}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const IncasariDirecte = () => {
    const result = useQuery(getBookingsByDate, {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })
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
          <h3 className="text-base font-normal text-gray-500">Incasati Direct</h3>
        </div>
      </>
    )
  }

  const RezervariOnline = () => {
    const result = useQuery(getBookingsByDateOnline, {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })
    const bookings = result[0]
    let locuri_pescuit = 0
    let casute = 0
    let casute2 = 0
    let agrement = 0
    let parcare = 0
    bookings.map((booking, i) => {
      locuri_pescuit += booking.loc_pescuit.length
      casute += booking.casuta.length
      casute2 += booking.casuta2.length
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
              <div>{casute * 95}Lei</div>
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
    const result = useQuery(getBookingsByDateOnline, {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })
    console.log(result)
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
    const result = useQuery(getBookingsByStartDate, {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })
    const bookings = result[0]
    return (
      <>
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">
              Data de inceput
            </label>
            <div className="border-2 rounded">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                includeDateIntervals={[
                  { start: subDays(new Date(), 365), end: addDays(new Date(), 30) },
                ]}
                className="cursor-pointer p-2"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">
              Data de sfarsit
            </label>
            <div className="border-2 rounded">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                includeDateIntervals={[
                  { start: subDays(new Date(), 365), end: addDays(new Date(), 30) },
                ]}
                className="cursor-pointer p-2"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mt-6 ">
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
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
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="min-h-screen flex justify-center items-center">
                  <div className="ping"></div>
                </div>
              }
            >
              <h3 className="font-bold mb-3">Locuri de pescuit rezervate</h3>
              <LocuriOcupate />
            </Suspense>
            <Suspense
              fallback={
                <div className="min-h-screen flex justify-center items-center">
                  <div className="ping"></div>
                </div>
              }
            >
              <h3 className="font-bold mb-3 mt-6">Casute Rezervate</h3>
              <CasuteOcupate />
            </Suspense>
            <Suspense
              fallback={
                <div className="min-h-screen flex justify-center items-center">
                  <div className="ping"></div>
                </div>
              }
            >
              <h3 className="font-bold mb-3 mt-6">Casute Rezervate Zatun 2</h3>
              <CasuteOcupate2 />
            </Suspense>
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
            <div className="">
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

        <table className="min-w-full divide-y divide-gray-200 mt-12">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nume
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Numar de telefon
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cost Total
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status Rezervare
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Detalii
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Confirma Intrarea
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {
              //@ts-ignore
              bookings?.map((booking, i) => {
                return (
                  <tr className={i % 2 ? "bg-gray-50" : ""} key={i}>
                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {format(subHours(booking.starts_at, 3), "dd.MM.yyyy")}
                    </td>
                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {booking.User?.name} {booking.User?.surname}
                    </td>

                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {booking.User?.email}
                    </td>

                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {booking.User?.phone}
                    </td>

                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {booking.total_price}
                    </td>

                    <td
                      className={
                        booking.paid
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-red-500"
                      }
                    >
                      {booking.paid ? "Platit" : "Neplatit"}
                    </td>

                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      <Link href={`/dashboard/rezervari/${booking.stripeSessionId}`}>
                        <button
                          type="button"
                          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Detalii
                        </button>
                      </Link>
                    </td>
                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {booking.verificat ? (
                        <CheckCircleIcon className="h-8 text-green-500 " />
                      ) : (
                        <CheckCircleIcon className="h-8 text-red-500 cursor-pointer" />
                      )}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
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
