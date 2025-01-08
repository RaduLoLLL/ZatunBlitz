import { BlitzPage, useSession, invoke } from "blitz"
import { Link, getSession, Routes, GetServerSideProps } from "blitz"
import { useState } from "react"
import db from "db"
import Layout from "app/core/layouts/Layout"
import updateUser from "./mutations/updateUser"
import toast from "react-hot-toast"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)
  if (!session.userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  const user = await db.user.findUnique({ where: { id: session.userId } })
  return { props: { user } }
}

function UserInfo({ user }) {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name || "",
    phone: user.phone || "",
    cnp: user.cnp || "",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    const toastId = toast.loading("Actualizam informatiile...")
    await invoke(updateUser, formData)
      .then(() => {
        toast.success("Informatiile au fost actualizate cu succes!", { id: toastId })
        setIsSaving(false)
      })
      .catch((err) => {
        toast.error("A aparut o eroare. Te rugăm să reîncarci pagina și să încerci din nou!", {
          id: toastId,
          duration: 10000,
        })
      }) // Update the user into the database
  }

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6">Informatii Utilizator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nume
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            defaultValue={user.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="cnp" className="block text-sm font-medium text-gray-700">
            CNP
          </label>
          <input
            type="text"
            name="cnp"
            id="cnp"
            value={formData.cnp}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefon
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user?.email || ""}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}
export default UserInfo
UserInfo.getLayout = (page) => <Layout title="User Info">{page}</Layout>
