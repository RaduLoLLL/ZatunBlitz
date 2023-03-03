import { BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <div>
      <div className="flex justify-center min-h-screen bg-gray-100 antialiased">
        <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
          <div className="text-center m-6">
            <h1 className="text-3xl font-semibold text-gray-700">Ți-ai uitat parola?</h1>
            <p className="text-gray-500 mt-4">
              Nu e nicio problema! Introdu adresa ta de E-mail mai jos și noi te vom ajuta să iți
              resetezi parola
            </p>
          </div>
          {isSuccess ? (
            <div>
              <h2>Cerere transmisă!</h2>
              <p>
                Dacă adresa ta de e-mail este înregistrată, vei primi în curând un link pentru
                resetarea parolei
              </p>
            </div>
          ) : (
            <Form
              submitText="Resetează parola"
              schema={ForgotPassword}
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                try {
                  await forgotPasswordMutation(values)
                } catch (error: any) {
                  return {
                    [FORM_ERROR]: "Ooops! A apărut o eroare neașteptată.",
                  }
                }
              }}
            >
              <LabeledTextField
                name="email"
                label="Email"
                placeholder="Email"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
