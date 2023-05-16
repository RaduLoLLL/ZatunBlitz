import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { NextSeo } from "next-seo"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <NextSeo
        title="Balta Zatun Galati - Inregistreaza-te"
        description="Balta Zatun Galati Complex de Agrement. Inregistreaza-te acum pentru a rezerva locul tau de pescuit in Balta Zatun."
      />
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
