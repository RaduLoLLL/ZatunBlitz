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

  const bgUrl =
    "https://images.unsplash.com/photo-1493787039806-2edcbe808750?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370"

  return (
    //   <div>
    //     <div className="relative flex flex-col sm:justify-center items-center ">
    //       <div className="relative sm:max-w-sm w-full">
    //         <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
    //         <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
    //         <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
    //           <label
    //             htmlFor=""
    //             className="block mt-3 text-sm text-gray-700 text-center font-semibold"
    //           >
    //             Log In
    //           </label>

    // <Form
    //   submitText="Login"
    //   schema={Login}
    //   initialValues={{ email: "", password: "" }}
    //   onSubmit={async (values) => {
    //     try {
    //       const user = await loginMutation(values)
    //       props.onSuccess?.(user)
    //     } catch (error: any) {
    //       if (error instanceof AuthenticationError) {
    //         return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
    //       } else {
    //         return {
    //           [FORM_ERROR]:
    //             "Sorry, we had an unexpected error. Please try again. - " +
    //             error.toString(),
    //         }
    //       }
    //     }
    //   }}
    // >
    //   <LabeledTextField
    //     name="email"
    //     label="Email"
    //     placeholder="Email"
    //     className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
    //   />
    //   <LabeledTextField
    //     name="password"
    //     label="Password"
    //     placeholder="Password"
    //     type="password"
    //     className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
    //   />
    //   <div className="flex justify-between">
    //     <Link href={Routes.ForgotPasswordPage()}>
    //       <a className="underline text-sm text-gray-600 hover:text-gray-900">
    //         Forgot your password?
    //       </a>
    //     </Link>
    //     <Link href={Routes.SignupPage()}>
    //       <a className="text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
    //         Sign Up
    //       </a>
    //     </Link>
    //   </div>
    // </Form>
    // <div className="flex justify-center">
    // <Link href="/api/auth/google">
    //   <button
    //     type="button"
    //     className="mt-5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
    //   >
    //     <svg
    //       className="w-4 h-4 mr-2 -ml-1"
    //       aria-hidden="true"
    //       focusable="false"
    //       data-prefix="fab"
    //       data-icon="google"
    //       role="img"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 488 512"
    //     >
    //       <path
    //         fill="currentColor"
    //         d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    //       ></path>
    //     </svg>
    //     Sign in with Google
    //   </button>
    // </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    <section className=" min-h-screen flex items-stretch text-white">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          background: "url(" + bgUrl + ")",
          backgroundPosition: "right",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
          <p className="text-3xl my-4">Capture your personal memory in unique way, anywhere.</p>
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-10 px-0 z-0 bg-D161616">
        <div
          className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
          style={{
            background:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
          }}
        ></div>
        <div className="w-full py-6 z-20 -mt-24">
          <h1 className="">
            <Image src="/Logo2.svg" height={250} width={500} />
          </h1>
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
            submitText="Login"
            className="text-gray-100 mt-10 space-y-10"
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
            <LabeledTextField
              name="email"
              label=""
              placeholder="Email"
              className="block w-full p-4 border-none outline-none text-xl rounded-sm bg-black"
            />
            <LabeledTextField
              name="password"
              label=""
              placeholder="Password"
              type="password"
              className="block w-full p-4 text-lg outline-none rounded-sm bg-black border-none"
            />
            <div className="flex justify-between">
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
