import { BlitzPage, getSession, Routes } from "blitz"
import Sidebar from "../components/Sidebar"

import { Suspense } from "react"
import ReservationForm from "app/pages/components/ReservationForm"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "ADMIN" && session.role != "PORTAR") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Adauga: BlitzPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <div className="ping"></div>
          </div>
        }
      >
        <Sidebar />
      </Suspense>
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <div className="ping"></div>
          </div>
        }
      >
        <ReservationForm />
      </Suspense>
    </>
  )
}
Adauga.authenticate = { redirectTo: Routes.Home() }
export default Adauga
