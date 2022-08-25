import { BlitzPage, useRouterQuery, invoke, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import confirmOrderPaid from "./mutations/confirmOrderPaid"
import { QRCodeCanvas } from "qrcode.react"
import { useRef } from "react"

import getQrInfo from "./queries/getQrInfo"

const stripe = require("stripe")(
  "sk_test_51KwksbK12xH0MvuUqzI0ibWFUlkVQl6OsQqLS6eyGr6Z1I3vs6mWA8bE6qQ3FSUIsQRxszXDH1tC2uGBw4HGvMpj00F2WMUy0T"
)

const Succes: BlitzPage = () => {
  const ref = useRef()
  const query = useRouterQuery()
  console.log(query)

  const test = invoke(confirmOrderPaid, query.session_id)

  const downloadQrCode = () => {
    //@ts-ignore
    let canvas = ref.current.querySelector("canvas")
    let image = canvas.toDataURL("image/png")
    let anchor = document.createElement("a")
    anchor.href = image
    anchor.download = `${query.session_id}.png`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }
  const booking = useQuery(getQrInfo, query.session_id)[0]
  console.log(booking)
  if (query.session_id && booking) {
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

                  {booking.loc_pescuit?.length > 0 ? (
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

                  {booking?.casuta.length > 0 ? (
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
                        Casuta ( Nr. {booking.casuta.join(", ")} )
                      </p>
                      <p className="text-black mr-4"> {booking.casuta.length} x 100 Lei</p>
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
                    <p className="text-indigo-600 mr-4">{booking.total_price} Lei</p>
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
                value={query.session_id}
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

  return <div></div>
}
export default Succes
Succes.getLayout = (page) => <Layout title="Checkout">{page}</Layout>
