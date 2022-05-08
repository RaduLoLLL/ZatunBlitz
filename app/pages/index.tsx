import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import NavbarLogedIn from "app/pages/components/NavbarLogedIn"
import NavbarLogedOut from "app/pages/components/NavbarLogedOut"

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
      <div className="container min-w-full"></div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
