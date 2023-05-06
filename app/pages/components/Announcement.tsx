import { Dialog } from "@headlessui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
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
                  Va informam ca in perioada 12.05 -13. 05.2023, Balta Zatun este inchisa pentru
                  desfasurarea unui concurs de pescuit
                </p>
                <hr className="my-3" />

                <p className="text-lg font-medium text-gray-500">
                  Vizitatorii care au casute rezervate in data de 11.05.2023 vor trebui sa le
                  elibereze pana la data de 12.05.2023,orele 10.00
                </p>
                <hr className="my-3" />
                <p className="text-lg font-medium text-gray-500">
                  Utilizatorii care doresc sa rezerve casute in data de 13.05.2023, o pot face
                  incepand cu orele 15.00, la intrarea in complex sau la numarul de telefon{" "}
                  <a href="tel:0753104218">
                    <span className="bg-gray-200 p-1 rounded-md">0753104218</span>
                  </a>
                  .{" "}
                </p>
                <hr className="my-3" />
                <p className="text-lg font-medium text-gray-500">Va multumim!</p>
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
  //if (user?.role === "ADMIN") return <></>
  return (
    <Suspense fallback={<></>}>
      <AnnouncementContent />
    </Suspense>
  )
}

export default Announcement
