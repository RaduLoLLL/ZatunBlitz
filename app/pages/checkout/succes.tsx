import { BlitzPage, useRouterQuery, invoke, useQuery, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import confirmOrderPaid from "./mutations/confirmOrderPaid"
import { QRCodeCanvas } from "qrcode.react"
import { useRef, useEffect } from "react"

import getQrInfo from "./queries/getQrInfo"
import { classNames } from "react-select/dist/declarations/src/utils"
const axios = require("axios")

const Succes: BlitzPage = () => {
  const ref = useRef()
  const query = useRouterQuery()

  const orderId = query.orderId
  const booking_id = query.booking_id

  useEffect(() => {
    const isPaid = invoke(confirmOrderPaid, { orderId, booking_id })
  }, [])

  const downloadQrCode = () => {
    //@ts-ignore
    let canvas = ref.current.querySelector("canvas")
    let image = canvas.toDataURL("image/png")
    let anchor = document.createElement("a")
    anchor.href = image
    anchor.download = `${orderId}.png`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }
  const booking = useQuery(getQrInfo, orderId)[0]

  if (orderId && booking) {
    return (
      <>
        <div>
          <div className="">
            <div className="mt-10">
              <div className="w-3/4 lg:w-1/2 mx-auto bg-white rounded-md">
                <div className="flex flex-col justify-center items-center">
                  <h6 className="text-black font-medium my-4">Sumarul Rezevarii</h6>
                  {booking?.intrare_complex ? (
                    <div
                      className="
    flex
    justify-between
    items-center
    w-full
    py-5
    border-b-2 border-gray-200
  "
                    >
                      <p className="text-gray-400 ml-4">Bilete intrare complex</p>
                      {booking?.intrare_complex > 1 ? (
                        <p className="text-black mr-4">{booking?.intrare_complex} x 20 Lei</p>
                      ) : (
                        <p className="text-black mr-4">20 Lei</p>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {booking?.loc_parcare ? (
                    <div
                      className="
    flex
    justify-between
    items-center
    w-full
    py-5
    border-b-2 border-gray-200
  "
                    >
                      <p className="text-gray-400 ml-4">Loc de Parcare</p>
                      {booking.loc_parcare > 1 ? (
                        <p className="text-black mr-4">{booking.loc_parcare} x 5 Lei</p>
                      ) : (
                        <p className="text-black mr-4"> 5 Lei</p>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {booking?.loc_pescuit?.length || 0 > 0 ? (
                    <div
                      className="
flex
justify-between
items-center
w-full
py-5
border-b-2 border-gray-200
"
                    >
                      <p className="text-gray-400 ml-4">
                        Loc de Pescuit ( Nr. {booking?.loc_pescuit.join(", ")} )
                      </p>
                      <p className="text-black mr-4">{booking?.loc_pescuit.length} x 50 Lei</p>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {booking?.casuta?.length || 0 > 0 ? (
                    <div
                      className="
flex
justify-between
items-center
w-full
py-5
border-b-2 border-gray-200
"
                    >
                      <p className="text-gray-400 ml-4">
                        Casuta ( Nr. {booking?.casuta.join(", ")} )
                      </p>
                      <p className="text-black mr-4"> {booking?.casuta.length} x 100 Lei</p>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div
                    className="
    flex
    justify-between
    items-center
    w-full
    py-5
    border-b-2 border-gray-200
  "
                  >
                    <p className="text-gray-400 ml-4">Total</p>
                    <p className="text-indigo-600 mr-4">{booking?.total_price} Lei</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center font-bold flex-col mt-20">
          {
            //@ts-ignore
            <div ref={ref} onClick={downloadQrCode} className="cursor-pointer">
              <QRCodeCanvas
                id="qrCodeId"
                size={300}
                //@ts-ignore
                value={orderId}
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
              />
            </div>
          }
          <div>
            <button
              onClick={downloadQrCode}
              type="button"
              className="mt-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Descarca Biletul
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="-mt-24 flex flex-col items-center bg-yellow-300 py-12 text-center absolute top-1/2 left-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2">
        <p className="text-xl">Status Rezervare: Neachitata</p>
        <p className="text-lg">
          Ceva nu a mers bine in timpul platii, dar puteti incerca din nou din sectiunea{" "}
          <span className="font-bold">"Contul Meu"</span>
        </p>
        <p className="mt-4">
          Statusul platii: <span className="font-bold">In asteptarea platii</span>
        </p>
        <div className="bg-black text-white px-8 py-3 mt-8">
          <Link href={Routes.RezervarileMele()}> Contul Meu</Link>
        </div>
      </div>
    </div>
  )
}
export default Succes
Succes.getLayout = (page) => <Layout title="Checkout">{page}</Layout>
