import Layout from "app/core/layouts/Layout"
import { BlitzPage, useParam } from "blitz"
import { QRCodeCanvas } from "qrcode.react"
import { useRef } from "react"

const BiletulMeu: BlitzPage = () => {
  const stripeSessionId = useParam("id") || ""
  const ref = useRef()

  const downloadQrCode = () => {
    //@ts-ignore
    let canvas = ref.current.querySelector("canvas")
    let image = canvas.toDataURL("image/png")
    console.log(image)
    let anchor = document.createElement("a")
    anchor.href = image
    anchor.download = `${stripeSessionId}.png`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }
  return (
    <>
      <div className="flex justify-center items-center mt-20 text-3xl font-semibold text-center mx-12">
        Biletul dumneavoastra este pregatit.
        <br /> Pentru accesul in complex va rugam sa prezentati acest bilet la intrare.
        <br /> Va multumim!
      </div>
      {/* @ts-ignore */}
      <div className="flex justify-center items-center mt-20 flex-col" ref={ref}>
        <QRCodeCanvas
          //@ts-ignore
          id="qrCodeId"
          size={300}
          //@ts-ignore
          value={stripeSessionId}
          className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
        />
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

export default BiletulMeu
BiletulMeu.getLayout = (page) => <Layout title="Rezervarile Mele">{page}</Layout>
