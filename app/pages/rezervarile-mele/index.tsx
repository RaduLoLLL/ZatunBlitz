import { BlitzPage, useQuery, Link, getSession } from "blitz"

import getMyBookings from "./queries/getMyBookings"
import Layout from "app/core/layouts/Layout"
import format from "date-fns/format"
import getUnpaidBookingDetails from "./queries/getUnpaidBookingDetails"
import CornerRibbon from "react-corner-ribbon"

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

const DisplayBookings = () => {
  const bookings = useQuery(getMyBookings, undefined)
  console.log(bookings[0])
  return (
    <div className="grid grid-cols-3 gap-4">
      {bookings[0].map((booking) => {
        return (
          <>
            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10 mx-10 relative overflow-hidden">
              <div className="flex justify-center items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  {format(booking.starts_at, "dd.MM.yyyy")}
                </h5>
              </div>
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Bilete intrare complex
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {booking.intrare_complex} x 20 Lei
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {booking.intrare_complex * 20} Lei
                      </div>
                    </div>
                  </li>
                  {booking.loc_parcare ? (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Loc de parcare
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {booking.loc_parcare} x 5 Lei
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {booking.loc_parcare * 5} Lei
                        </div>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}

                  {booking.loc_pescuit ? (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Loc de pescuit
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Locul numarul {booking.loc_pescuit}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          50 Lei
                        </div>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}

                  {booking.casuta ? (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Casuta
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Casuta numarul {booking.casuta}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          100 Lei
                        </div>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}

                  {booking.sezlong ? (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Sezlong
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Sezlongul numarul {booking.sezlong}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          15 Lei
                        </div>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}
                  {booking.sedinta_foto ? (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Sedinta Foto
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400"></p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          100 Lei
                        </div>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}

                  {booking.petrecere_privata ? (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Petrecere Privata
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400"></p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          200 Lei
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
                        {booking.total_price} Lei
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="flex justify-center bottom-0">
                  {booking.paid ? (
                    <></>
                  ) : (
                    <Link href="/checkout">
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
  )
}

const RezervarileMele: BlitzPage = () => {
  return <DisplayBookings />
}
export default RezervarileMele
RezervarileMele.getLayout = (page) => <Layout title="Rezervarile Mele">{page}</Layout>
