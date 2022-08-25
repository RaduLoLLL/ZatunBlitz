import { BlitzPage, useRouterQuery, invoke, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import confirmOrderPaid from "./mutations/confirmOrderPaid"
import { QRCodeCanvas } from "qrcode.react"
import { useRef } from "react"
import Rezumat from "./components/Rezumat"
import getQrInfo from "./queries/getQrInfo"

const stripe = require("stripe")(
  "sk_test_51KwksbK12xH0MvuUqzI0ibWFUlkVQl6OsQqLS6eyGr6Z1I3vs6mWA8bE6qQ3FSUIsQRxszXDH1tC2uGBw4HGvMpj00F2WMUy0T"
)

const Succes: BlitzPage = () => {
  const ref = useRef()
  const query = useRouterQuery()

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
  return (
    <>
      <div>
        <Rezumat booking={booking} />
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
export default Succes
Succes.getLayout = (page) => <Layout title="Checkout">{page}</Layout>
