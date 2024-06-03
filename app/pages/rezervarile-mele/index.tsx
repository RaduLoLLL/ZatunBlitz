import { Link, getSession, Routes, GetServerSideProps, invoke } from "blitz"

import Layout from "app/core/layouts/Layout"
import format from "date-fns/format"
import CornerRibbon from "react-corner-ribbon"
import db from "db"
import { subDays, subHours } from "date-fns"
import { useEffect } from "react"
import deleteUnpaidBooking from "app/bookings/mutations/deleteUnpaidBooking"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)
  invoke(deleteUnpaidBooking, session.userId)

  if (!session.userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  const bookings = await db.booking.findMany({
    where: { userId: session.userId },
    orderBy: [{ starts_at: "desc" }],
  })
  return { props: { bookings } }
}

function RezervarileMele({ bookings }) {
  const DisplayBookings = () => {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-center">
          <Link href={Routes.Add()}>
            <button
              type="button"
              className=" mt-12 text-2xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 "
            >
              Rezervare noua
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-3">
          {bookings.map((booking, i) => {
            return (
              <>
                <div
                  className="p-10 max-w-md bg-white rounded-lg border shadow-md sm:p-12 dark:bg-gray-800 dark:border-gray-700 mt-10 mx-auto relative overflow-hidden"
                  key={i}
                >
                  <div className="flex justify-center items-center mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                      {format(subHours(booking.starts_at, 3), "dd.MM.yyyy")}
                    </h5>
                  </div>
                  <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                      {booking.intrare_complex ? (
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Bilete Agrement
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {booking.intrare_complex} x 15 Lei
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {booking.intrare_complex * 15}
                              Lei
                            </div>
                          </div>
                        </li>
                      ) : (
                        <></>
                      )}

                      {booking.loc_parcare ? (
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Loc de parcare
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {booking.loc_parcare} x 10 Lei
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {booking.loc_parcare * 10} Lei
                            </div>
                          </div>
                        </li>
                      ) : (
                        <></>
                      )}

                      {booking.loc_pescuit.length ? (
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Loc de pescuit
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Locul numarul{" "}
                                {booking.loc_pescuit.map(
                                  (loc, i) => loc + (i !== booking.loc_pescuit.length - 1 && ", ")
                                )}
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {booking.loc_pescuit.length} x 75 Lei
                            </div>
                          </div>
                        </li>
                      ) : (
                        <></>
                      )}

                      {booking.casuta.length ? (
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Casuta
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Casuta numarul{" "}
                                {booking.casuta.map(
                                  (loc, i) => loc + (i !== booking.casuta.length - 1 && ", ")
                                )}
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {booking.casuta.length} 95 Lei
                            </div>
                          </div>
                        </li>
                      ) : (
                        <></>
                      )}
                      {booking.casuta2.length ? (
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Casuta Zatun 2
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Casuta numarul{" "}
                                {booking.casuta2.map(
                                  (loc, i) => loc + (i !== booking.casuta2.length - 1 && ", ")
                                )}
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {booking.casuta2.length} 130 Lei
                            </div>
                          </div>
                        </li>
                      ) : (
                        <></>
                      )}

                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                              Total
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400"></p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-indigo-600 dark:text-white">
                            {booking.total_price.toFixed(2)} Lei
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="flex justify-center bottom-0">
                      {booking.paid ? (
                        <>
                          {
                            //@ts-ignore

                            <div className="mt-5">
                              <Link href={`/rezervarile-mele/${booking.stripeSessionId}`}>
                                <button
                                  type="button"
                                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                  Genereaza Biletul
                                </button>
                              </Link>
                            </div>
                          }
                        </>
                      ) : (
                        <Link href={"/checkout?booking=" + booking.id}>
                          <button
                            type="button"
                            className="focus:outline-none mt-5 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900"
                          >
                            Achita Rezervarea
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                  {booking.paid ? (
                    <CornerRibbon
                      position="top-right" // OPTIONAL, default as "top-right"
                      fontColor="#f0f0f0" // OPTIONAL, default as "#f0f0f0"
                      backgroundColor="#2c7" // OPTIONAL, default as "#2c7"
                      containerStyle={{}} // OPTIONAL, style of the ribbon
                      style={{}} // OPTIONAL, style of ribbon content
                      className="" // OPTIONAL, css class of ribbon
                    >
                      PLATIT
                    </CornerRibbon>
                  ) : (
                    <CornerRibbon
                      position="top-right" // OPTIONAL, default as "top-right"
                      fontColor="#f0f0f0" // OPTIONAL, default as "#f0f0f0"
                      backgroundColor="#B91C1C" // OPTIONAL, default as "#2c7"
                      containerStyle={{}} // OPTIONAL, style of the ribbon
                      style={{}} // OPTIONAL, style of ribbon content
                      className="" // OPTIONAL, css class of ribbon
                    >
                      NEACHITAT
                    </CornerRibbon>
                  )}
                </div>
              </>
            )
          })}
        </div>
      </div>
    )
  }

  return <DisplayBookings />
}
export default RezervarileMele
RezervarileMele.getLayout = (page) => <Layout title="Rezervarile Mele">{page}</Layout>
