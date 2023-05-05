import {
  BlitzPage,
  useRouterQuery,
  invoke,
  Link,
  Routes,
  useQuery,
  useMutation,
  Router,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import { QRCodeCanvas } from "qrcode.react"
import { useRef, useEffect, useState, Suspense } from "react"

import confirmOrderPaid from "./mutations/confirmOrderPaid"

const Succes: BlitzPage = () => {
  const ref = useRef()
  const query = useRouterQuery()
  const [confirmed, setConfirmed] = useState(false)
  const orderId = query.orderId
  const booking_id = query.booking_id

  useEffect(() => {
    const confirm = invoke(confirmOrderPaid, { orderId, booking_id }).then(() => {
      Router.push(RezervarileMele())
    })
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

  const Result = () => {
    if (query.approvalCode) {
      return (
        <>
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
    } else {
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
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="ping"></div>
        </div>
      }
    >
      <Result />
    </Suspense>
  )
}
export default Succes
Succes.getLayout = (page) => <Layout title="Checkout">{page}</Layout>
