import { gSSP } from "app/blitz-server";
import { getSession } from "@blitzjs/auth";
import { BlitzPage, Routes } from "@blitzjs/next";
import Sidebar from "../../../components/Sidebar"

import { Suspense } from "react"
import Form from "./components/Form"

export const getServerSideProps = gSSP(async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "ADMIN" && session.role != "SUPERADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
})

const BlocareTotala: BlitzPage = () => {
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
        <Form />
      </Suspense>
    </>
  )
}
BlocareTotala.authenticate = { redirectTo: Routes.Home() }
export default BlocareTotala
