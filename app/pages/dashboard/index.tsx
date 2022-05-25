import { BlitzPage, useQuery, Link, Routes, getSession } from "blitz"
import format from "date-fns/format"
import getLast7DaysBookings from "./queries/getLast7DaysBookgins"
import Layout from "app/core/layouts/Layout"
import getBookingsBetween from "./queries/getBookingsBetween"
import getLast7DaysUsers from "./queries/getLast7DaysUsers"
import getUsersBetween from "./queries/getUsersBetween"
import { Sidebar } from "./components/Sidebar"

import { Suspense } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Chart = () => {
  const bookings = useQuery(getLast7DaysBookings, undefined)[0]
  const data = [{ data: "", total: 0 }]

  bookings.map((booking) => {
    data.push({ data: format(booking.starts_at, "dd.MM.yyyy"), total: booking.total_price })
  })
  console.log(data)
  return (
    <>
      <ResponsiveContainer width={700} height={400} className="hidden md:block">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

const UltimeleRezervari = () => {
  const result = useQuery(getLast7DaysBookings, undefined)
  const bookings = result[0]
  return (
    <>
      {bookings.map((booking, i) => {
        return (
          <tr className={i % 2 ? "bg-gray-50" : ""} key={booking.id}>
            <td
              className={
                i % 2
                  ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                  : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
              }
            >
              Rezervare facuta de{" "}
              <span className="font-semibold">
                {booking.User?.name} {booking.User?.surname}
              </span>
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
              {format(booking.starts_at, "dd.MM.yyyy")}
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              {booking.total_price} Lei
            </td>
          </tr>
        )
      })}
    </>
  )
}

const NumarUseri = () => {
  const users = useQuery(getLast7DaysUsers, undefined)[0]
  const lastWeek = useQuery(getUsersBetween, undefined)[0]
  let procent = ((users.length - lastWeek.length) * 100) / lastWeek.length
  if (procent === Infinity) procent = 100
  return (
    <>
      <div className="flex-shrink-0">
        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
          {users.length}
        </span>
        <h3 className="text-base font-normal text-gray-500">
          Utilizatori noi inregistrati in ultimele 7 zile
        </h3>
      </div>
      <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
        {procent}%
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </>
  )
}

const NumarRezervari = () => {
  const result = useQuery(getLast7DaysBookings, undefined)
  const bookings = result[0]
  const lastWeek = useQuery(getBookingsBetween, undefined)[0]
  let procent = ((bookings.length - lastWeek.length) * 100) / lastWeek.length
  if (procent === Infinity) procent = 100

  return (
    <>
      <div className="flex-shrink-0">
        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
          {bookings.length}
        </span>
        <h3 className="text-base font-normal text-gray-500">Rezervari in aceasta saptamana</h3>
      </div>
      <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
        {procent}%
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </>
  )
}

const TotalPrice = () => {
  const result = useQuery(getLast7DaysBookings, undefined)
  const bookings = result[0]
  let totalPrice = 0
  bookings.map((booking, i) => {
    totalPrice += booking.total_price
  })
  return (
    <div>
      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
        {totalPrice} Lei
      </span>
      <h3 className="text-base font-normal text-gray-500">Vanzari in ultimele 7 zile</h3>
    </div>
  )
}

const Dashboard: BlitzPage = () => {
  return (
    <>
      <div>
        <div className="flex overflow-hidden bg-white pt-16">
          <Sidebar />
          <div
            className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          ></div>
          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <main>
              <div className="pt-6 px-4 min-h-screen">
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-shrink-0">
                        <Suspense fallback="...">
                          <TotalPrice />
                        </Suspense>
                      </div>
                    </div>
                    <div id="main-chart">
                      <Suspense fallback="...">
                        <Chart />
                      </Suspense>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Ultimele Rezervari</h3>
                        <span className="text-base font-normal text-gray-500">
                          Lista ultimelor tranzactii
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col mt-8">
                      <div className="overflow-x-auto rounded-lg">
                        <div className="align-middle inline-block min-w-full">
                          <div className="shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Rezervare
                                  </th>
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
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <Suspense fallback="...">
                                  <UltimeleRezervari />
                                </Suspense>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <Suspense fallback="...">
                        <NumarRezervari />
                      </Suspense>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <Suspense fallback="...">
                        <NumarUseri />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <p className="text-center text-sm text-gray-500 my-10">
              &copy; 2022{" "}
              <a href="#" className="hover:underline" target="_blank">
                Zamfir Radu
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
        <script src="https://demo.themesberg.com/windster/app.bundle.js"></script>
      </div>
    </>
  )
}
export default Dashboard
