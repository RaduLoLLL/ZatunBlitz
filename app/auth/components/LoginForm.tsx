import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType, Image } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const bgUrl = "/LoginForm.webp"

  return (
    <section className=" min-h-screen flex items-stretch text-white">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          background: "url(" + bgUrl + ")",
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
          <p className="text-3xl my-4">Capture your personal memory in unique way, anywhere.</p>
        </div>
      </div>
      <div
        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-10 px-0 z-0 bg-D161616"
        style={
          window.innerWidth < 900
            ? {
                background: "url(" + bgUrl + ")",
                backgroundPosition: "top",
                backgroundSize: "cover",
              }
            : {}
        }
      >
        <div className="py-6 mx-8 w-1/2">
          <div className="flex justify-center mb-6">
            <Image src="/logoExtern.png" width={200} height={200} alt="Logo" />
          </div>
          <div className="space-x-2">
            <Link href="/api/auth/google">
              <button
                type="button"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Intra in cont cu Google
              </button>
            </Link>
          </div>
          <p className="text-gray-100">sau foloseste email-ul si parola</p>
          <Form
            submitText="Intra in cont"
            className="text-gray-100 mt-10 space-y-10 flex-1"
            schema={Login}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                const user = await loginMutation(values)
                props.onSuccess?.(user)
              } catch (error: any) {
                if (error instanceof AuthenticationError) {
                  return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                } else {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                  }
                }
              }
            }}
          >
            <LabeledTextField name="email" label="" placeholder="Email" className="inputs" />
            <LabeledTextField
              name="password"
              label=""
              placeholder="Password"
              type="password"
              className="inputs"
            />

            <div className="flex justify-between mx-5">
              <Link href={Routes.ForgotPasswordPage()}>
                <a className="text-sm text-gray-100 hover:text-gray-400">Ai uitat parola?</a>
              </Link>
              <Link href={Routes.SignupPage()}>
                <a className="text-gray-200 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-125">
                  Creeaza un cont
                </a>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
