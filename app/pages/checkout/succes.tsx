import { BlitzPage, useRouterQuery, invoke } from "blitz"
import Layout from "app/core/layouts/Layout"
import confirmOrderPaid from "./mutations/confirmOrderPaid"
import { QRCodeCanvas } from "qrcode.react"
import { useRef } from "react"

const stripe = require("stripe")(
  "sk_test_51KwksbK12xH0MvuUqzI0ibWFUlkVQl6OsQqLS6eyGr6Z1I3vs6mWA8bE6qQ3FSUIsQRxszXDH1tC2uGBw4HGvMpj00F2WMUy0T"
)

const Succes: BlitzPage = () => {
  const ref = useRef()
  const query = useRouterQuery()

  const test = invoke(confirmOrderPaid, query.session_id)

  const QrCode = () => {
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
              id="qrCodeId"
              size={300}
              //@ts-ignore
              value={query.session_id}
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
    let anchor = document.createElement("a")
    anchor.href = image
    anchor.download = "qr-demo.png"
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }
  return (
    <>
      <div className="flex justify-center mt-6 font-bold">Felicitari! Ai platit cu succes</div>
      {
        //@ts-ignore

        <div ref={ref} onClick={downloadQrCode} className="cursor-pointer">
          <QrCode />
        </div>
      }
    </>
  )
}
export default Succes
Succes.getLayout = (page) => <Layout title="Checkout">{page}</Layout>
