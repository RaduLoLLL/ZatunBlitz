import { Suspense, useEffect, useState } from "react"
import { useQuery, invoke } from "blitz"
import insertAnnouncement from "../dashboard/anunturi/mutations/insertAnnouncement"
import toast from "react-hot-toast"

const AnnouncemetForm = () => {
  const [anunt, setAnunt] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault()
    const toastID = toast.loading("Se trimite anuntul")
    const add = await invoke(insertAnnouncement, { content: anunt }).then(() => {
      toast.success("Anuntul a fost trimis", { id: toastID })
      setAnunt("")
    })
  }

  return (
    <>
      <div className="mx-auto max-w-xs lg:max-w-md ">
        <div className="my-10 p-4  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 ">Anunturi Balta Zatun</h5>
            <>
              <div>
                <div className="border-2 rounded">
                  <textarea
                    rows={4}
                    placeholder="Adauga un anunt"
                    value={anunt}
                    onChange={(e) => {
                      setAnunt(e.target.value)
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>
              </div>
            </>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Trimite
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AnnouncemetForm
