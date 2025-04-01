import { BlitzPage } from "blitz"
import db from "db"
import { Suspense } from "react"
import { getSession } from "blitz"

import Sidebar from "app/components/Sidebar"

import ReservationForm from "../components/ReservationForm"

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getSession(req, res)

  if (session.role !== "SUPERADMIN") {
    return {
      redirect: { destination: "/", permanent: false },
    }
  }

  const bookingId = parseInt(params.bookingId, 10) // Convert ID to an integer

  if (isNaN(bookingId)) {
    return {
      notFound: true, // Handle invalid ID gracefully
    }
  }

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
  })

  if (!booking) {
    return {
      notFound: true, // Handle case where booking is not found
    }
  }

  return { props: { booking } }
}

const EditBooking: BlitzPage<{ booking: any }> = ({ booking }) => {
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
      <Suspense fallback="...">
        <ReservationForm booking={booking} />
      </Suspense>
    </>
  )
}

export default EditBooking
