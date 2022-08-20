import { BlitzPage, getSession, Image, Link, useQuery, useRouterQuery } from "blitz"
import { format } from "date-fns"
import { Fragment, Suspense, useState } from "react"
import getBookings from "../queries/getBookings"
import { QrReader } from "react-qr-reader"
import { Dialog, Transition } from "@headlessui/react"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "VERIFICARE") {
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
  const [qrData, setQrData] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  function closeModal() {
    setIsModalOpen(false)
  }

  function openModal() {
    setIsModalOpen(true)
  }
  const router = useRouterQuery()

  const [state, setState] = useState({
    sessionId: "",
    name: router.name,
    surname: router.surname,
    email: router.email,
    phone: router.phone,
  })

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
                Status Rezervare
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Detalii
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
                      {format(booking.starts_at, "dd.MM.yyyy")}
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
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={openModal}
                    className="w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Scaneaza Biletul
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
                            <QrReader
                              onResult={(result, error) => {
                                if (!!result) {
                                  setQrData(result?.text)
                                }

                                if (!!error) {
                                  console.info(error)
                                }
                              }}
                              style={{ width: "100%" }}
                            />
                            <p>{qrData}</p>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
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

export default VerificareBilet
