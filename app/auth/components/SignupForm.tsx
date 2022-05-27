import { useMutation, Routes, Link, Image } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const bgUrl =
    "https://images.unsplash.com/photo-1493787039806-2edcbe808750?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370"

  return (
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
      <div
        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-10 px-0 z-0 bg-D161616"
        style={
          window.innerWidth < 900
            ? {
                background: "url(" + bgUrl + ")",
              }
            : {}
        }
      >
        <div className="py-6 mx-8">
          <div className="flex justify-center ">
            <Image src="/Logo2.svg" width={400} height={300} />
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
            submitText="Creeaza un cont"
            className="text-gray-100 mt-10 space-y-10"
            schema={Signup}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await signupMutation(values)
                props.onSuccess?.()
              } catch (error: any) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                  // This error comes from Prisma
                  return { email: "This email is already being used" }
                } else {
                  return { [FORM_ERROR]: error.toString() }
                }
              }
            }}
          >
            <LabeledTextField name="name" label="" placeholder="Nume" className="inputs" />
            <LabeledTextField name="surname" label="" placeholder="Prenume" className="inputs" />
            <LabeledTextField name="phone" label="" placeholder="Telefon" className="inputs" />
            <LabeledTextField name="email" label="" placeholder="Email" className="inputs" />
            <LabeledTextField
              name="password"
              label=""
              placeholder="Parola"
              type="password"
              className="inputs"
            />
            <div className="flex justify-between mx-12">
              <label className="mr-2">Already have an accout?</label>
              <Link href={Routes.LoginPage()}>
                <a className="text-gray-200 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-125">
                  Log In
                </a>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </section>

    // <div>
    //   <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
    //     <div className="relative sm:max-w-sm w-full">
    //       <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
    //       <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
    //       <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
    //         <label
    //           htmlFor=""
    //           className="block mt-3 text-sm text-gray-700 text-center font-semibold"
    //         >
    //           Create an account
    //         </label>

    // <Form
    //   submitText="Create Account"
    //   schema={Signup}
    //   initialValues={{ email: "", password: "" }}
    //   onSubmit={async (values) => {
    //     try {
    //       await signupMutation(values)
    //       props.onSuccess?.()
    //     } catch (error: any) {
    //       if (error.code === "P2002" && error.meta?.target?.includes("email")) {
    //         // This error comes from Prisma
    //         return { email: "This email is already being used" }
    //       } else {
    //         return { [FORM_ERROR]: error.toString() }
    //       }
    //     }
    //   }}
    // >
    //   <LabeledTextField
    //     name="name"
    //     label="Name"
    //     placeholder="Name"
    //     className="block w-full p-4 text-lg outline-none rounded-sm bg-black border-none"
    //   />
    //   <LabeledTextField
    //     name="surname"
    //     label="Surname"
    //     placeholder="Surname"
    //     className="block w-full p-4 text-lg outline-none rounded-sm bg-black border-none"
    //   />
    //   <LabeledTextField
    //     name="phone"
    //     label="Phone"
    //     placeholder="Phone"
    //     className="block w-full p-4 text-lg outline-none rounded-sm bg-black border-none"
    //   />
    //   <LabeledTextField
    //     name="email"
    //     label="Email"
    //     placeholder="Email"
    //     className="block w-full p-4 text-lg outline-none rounded-sm bg-black border-none"
    //   />
    //   <LabeledTextField
    //     name="password"
    //     label="Password"
    //     placeholder="Password"
    //     type="password"
    //     className="block w-full p-4 text-lg outline-none rounded-sm bg-black border-none"
    //   />
    //   <div className="flex justify-between">
    //     <label className="mr-2">Already have an accout?</label>
    //     <Link href={Routes.LoginPage()}>
    //       <a className="text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
    //         Log In
    //       </a>
    //     </Link>
    //   </div>
    // </Form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default SignupForm
