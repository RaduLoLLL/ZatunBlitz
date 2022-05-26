import { Head, BlitzLayout } from "blitz"
import { Suspense } from "react"
import { UserInfo } from "app/pages"
import "../../../styles/globlal.css"
import Loader from "app/components/Loader"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Zatun"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <div className="ping"></div>
          </div>
        }
      >
        <UserInfo />
      </Suspense>
      <Suspense fallback={<div className="ping"></div>}>{children}</Suspense>
    </>
  )
}

export default Layout
