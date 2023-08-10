import { BlitzPage, getSession, Routes } from "blitz"
import Sidebar from "../../../components/Sidebar"

import { Suspense } from "react"
import ReservationForm from "app/pages/components/ReservationForm"
import AnnouncemetForm from "app/pages/components/AnnouncementForm"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "ADMIN" && session.role != "PORTAR" && session.role != "SUPERADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Anunturi: BlitzPage = () => {
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
        <AnnouncemetForm />
      </Suspense>
    </>
  )
}
Anunturi.authenticate = { redirectTo: Routes.Home() }
export default Anunturi
