import { Dialog } from "@headlessui/react"
import { Link, Routes } from "blitz"
import React, { Suspense } from "react"
import Cookies from "universal-cookie"

const Announcement = (props) => {
  const cookies = new Cookies()
  //const user = useCurrentUser()
  const [open, setOpen] = React.useState(cookies.get("announcement") !== "true")
  const AnnouncementContent = () => {
    return (
      <div className="mx-10">
        <Dialog open={open} onClose={() => {}}>
          <Dialog.Overlay className="fixed z-40 inset-0 bg-black opacity-70" />
          <div className="fixed inset-0 flex items-center justify-center z-50 mx-4">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xl w-full">
              <Dialog.Title className="text-2xl font-medium text-red-600">Atenție</Dialog.Title>
              <div className="mt-2">
                <p className="text-lg font-medium text-gray-500">
                  Pentru o mai bună utilizare a aplicației puteți consulta{" "}
                  <span
                    className="text-red-600 font-bold"
                    onClick={() => {
                      cookies.set("announcement", "true", { path: "/", maxAge: 600 })
                      setOpen(false)
                    }}
                  >
                    <Link href={Routes.ManualUtilizare()}> manualul de utilizare.</Link>
                  </span>
                </p>
                <hr className="my-3" />
                <p className="text-lg font-medium text-gray-500">
                  {/* Pentru a rezerva foișoarele vă rugăm să sunați la numărul de telefon{" "}
                  <a href="tel:0753104218">
                    <span className="font-bold text-red-600">0753 104 218</span>
                  </a> */}
                </p>
                <hr className="my-3" />
                <p className="text-lg font-medium text-gray-500">
                  Va informam ca in data de 20.07.2023 si 26.07.2023 balta va fi inchisa
                  <br />
                  <br /> Ne cerem scuze pentru situatia creata. Va multumim!
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  onClick={() => {
                    cookies.set("announcement", "true", { path: "/", maxAge: 600 })
                    setOpen(false)
                  }}
                >
                  Am înțeles
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
  return (
    <Suspense fallback={<></>}>
      <AnnouncementContent />
    </Suspense>
  )
}

export default Announcement
