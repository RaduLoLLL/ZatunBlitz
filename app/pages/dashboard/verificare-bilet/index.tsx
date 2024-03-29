import { CheckCircleIcon } from "@heroicons/react/solid"
import { BlitzPage, getSession, invoke, Link, Routes, useQuery, useRouterQuery } from "blitz"
import { format, subHours } from "date-fns"
import { Suspense, useState } from "react"
import toast from "react-hot-toast"
import Sidebar from "../../../components/Sidebar"
import insertVerificare from "../mutations/insertVerificare"
import getBookings from "../queries/getBookings"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "PORTAR" && session.role != "ADMIN" && session.role != "SUPERADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const VerificareBilet: BlitzPage = () => {
  const router = useRouterQuery()

  const [state, setState] = useState({
    sessionId: "",
    name: router.name,
    surname: router.surname,
    email: router.email,
    phone: router.phone,
  })

  async function verificaBilet(booking_id) {
    const verificare = toast.loading("Se inregistreaza intrarea")
    const res = await invoke(insertVerificare, booking_id)
    res && toast.success("Inregistrare realizata cu succes", { id: verificare })
    !res && toast.error("Whoops, a intervenit o eroare", { id: verificare })
    setState({ ...state })
  }

  const DisplayBookings = () => {
    const bookings = useQuery(getBookings, state)[0]
    return (
      <>
        <table className="min-w-full divide-y divide-gray-200">
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
                      {format(subHours(booking.starts_at, 2), "dd.MM.yyyy")}
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
                        <CheckCircleIcon
                          className="h-8 text-red-500 cursor-pointer"
                          onClick={() => verificaBilet(booking.id)}
                        />
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

  const handleInputChange = (evt) => {
    const name = evt.target.name
    const value = evt.target.value
    setState({ ...state, [name]: value })
  }

  return (
    <>
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
              <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4 ">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                  <div>
                    <input
                      type="text"
                      name="sessionId"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="ID"
                      onChange={handleInputChange}
                      value={state.sessionId}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nume"
                      onChange={handleInputChange}
                      value={state.name}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="surname"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Prenume"
                      onChange={handleInputChange}
                      value={state.surname}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Email"
                      onChange={handleInputChange}
                      value={state.email}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Numar de telefon"
                      onChange={handleInputChange}
                      value={state.phone}
                    />
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex justify-center items-center">
                        <div className="ping"></div>
                      </div>
                    }
                  >
                    <DisplayBookings />
                  </Suspense>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

VerificareBilet.authenticate = { redirectTo: Routes.Home() }

export default VerificareBilet
