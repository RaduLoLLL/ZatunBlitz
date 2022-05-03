import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import getBooking from "app/queries/getBooking"
import NavbarLogedIn from "app/pages/components/NavbarLogedIn"
import NavbarLogedOut from "app/pages/components/NavbarLogedOut"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  if (currentUser) {
    return (
      <>
        <div className="container min-w-full">
          <NavbarLogedIn />
        </div>
      </>
    )
  } else {
    return (
      <>
        <NavbarLogedOut />
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <>
      <div className="container min-w-full">
        {/*<main>
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>{booking.total_price}</li>
            ))}
          </ul>
            </main>*/}
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
