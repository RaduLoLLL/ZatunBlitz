import { Head, BlitzLayout } from "blitz"
import { Suspense } from "react"
import { UserInfo } from "app/pages"
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
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  )
}

export default Layout
