import { useRouter, BlitzPage, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const session = useSession()
  const router = useRouter()

  return (
    <div className="">
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next
            ? decodeURIComponent(router.query.next as string)
            : "/rezervarile-mele"
          const adminNext = router.query.next
            ? decodeURIComponent(router.query.next as string)
            : "/dashboard"

          if (session.role == "ADMIN") {
            router.push(adminNext)
          } else {
            router.push(next)
          }
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
