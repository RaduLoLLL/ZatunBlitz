import { Link, getSession, Routes, GetServerSideProps } from "blitz"

import Layout from "app/core/layouts/Layout"
import format from "date-fns/format"
import CornerRibbon from "react-corner-ribbon"
import { QRCodeCanvas } from "qrcode.react"
import { useRef, useState } from "react"
import db from "db"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  const bookings = await db.booking.findMany({
    where: { userId: session.userId },
    orderBy: [{ starts_at: "desc" }],
  })

  if (!session.userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  return { props: { bookings } }
}

function RezervarileMele({ bookings }) {
  const ref = useRef()

  const [display, setDisplay] = useState(false)

  const DisplayBookings = () => {
    const QrCode = ({ bookingId }: { bookingId: string }) => {
      return (
        <>
          <div className="flex items-center justify-center mt-6 bg-white">
            <div className="overflow-hidden aspect-square bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black  to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10  transition duration-300 ease-in-out">
                    <div className="font-bold">Descarca Biletul</div>
                  </div>
                </div>
              </div>
              <QRCodeCanvas
                //@ts-ignore
                id="qrCodeId"
                size={500}
                value={bookingId}
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
              />
            </div>
          </div>
        </>
      )
    }
    const downloadQrCode = () => {
      //@ts-ignore
      let canvas = ref.current.querySelector("canvas")
      let image = canvas.toDataURL("image/png")
      console.log(image)
      let anchor = document.createElement("a")
      anchor.href = image
      anchor.download = "BiletZatun.png"
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    }

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
                  onMouseEnter={() => setDisplay(true)}
                  onMouseLeave={() => setDisplay(false)}
                >
                  <div className="flex justify-center items-center mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                      {format(booking.starts_at, "dd.MM.yyyy")}
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
                                {booking.intrare_complex} x 20 Lei
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {booking.intrare_complex * 20} Lei
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

                      {booking.loc_pescuit.length ? (
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

                      {booking.casuta.length ? (
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
                        <>
                          {
                            //@ts-ignore

                            <div ref={ref} className="mt-5">
                              <button
                                onClick={() => {
                                  //@ts-ignore
                                  downloadQrCode(booking?.stripeSessionId)
                                }}
                                type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                              >
                                Descarca Biletul
                              </button>
                              {
                                //@ts-ignore
                              }
                              <span className="hidden">
                                {
                                  //@ts-ignore
                                  QrCode(booking.stripeSessionId)
                                }
                              </span>
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
