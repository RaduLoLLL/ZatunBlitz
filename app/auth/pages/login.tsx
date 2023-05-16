import { useRouter, BlitzPage, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { NextSeo } from "next-seo"

const LoginPage: BlitzPage = () => {
  const session = useSession()
  const router = useRouter()

  return (
    <div className="">
      <NextSeo
        title="Balta Zatun Galati - Conecteaza-te"
        description="Balta Zatun Galati Complex de Agrement. Conecteaza-te acum pentru a rezerva locul tau de pescuit in Balta Zatun."
      />
      <LoginForm />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
