import Layout from "app/core/layouts/Layout"
import {
  BlitzPage,
  useMutation,
  Link,
  getSession,
  useRouterQuery,
  invoke,
  useSession,
  Router,
} from "blitz"
import createCheckoutSession from "./mutations/createCheckoutSession"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createCheckoutSessionWithId from "./mutations/createCheckoutSessionWithId"

import { useLatestBooking } from "app/bookings/hooks/useLatestBooking"
import { format, subHours } from "date-fns"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (!session.userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Checkout: BlitzPage = () => {
  const query = useRouterQuery()

  const booking = useLatestBooking(query.booking)
  const currentUser = useCurrentUser()

  const createCheckout = async () => {
    const res = await invoke(createCheckoutSession, {
      user: currentUser,
      booking_id: booking?.id,
    }).then((res) => {
      Router.push(res?.data.formUrl)
    })
  }
  const createCheckoutWithId = async () => {
    const res = await invoke(createCheckoutSessionWithId, {
      booking_id: booking?.id,
      user: currentUser,
    }).then((res) => {
      Router.push(res?.data.formUrl)
    })
  }

  const Sumar = () => {
    if (!booking) {
      return (
        <>
          <div
            className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800 flex flex-col justify-center"
            role="alert"
          >
            <div className="flex justify-center">
              <span className="font-medium text-center">Oops!</span> Nu ai nicio rezervare creata
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <p>Apasa aici pentru a creea o rezervare</p>
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/add">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Creeaza o rezervare
              </button>
            </Link>
          </div>
        </>
      )
    } else {
      if (booking?.paid) {
        return (
          <>
            <div
              className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800 flex flex-col justify-center"
              role="alert"
            >
              <div className="flex justify-center">
                <span className="font-medium text-center mr-3 text-lg">Oops!</span>{" "}
                <span className="text-lg">Rezervarea ta a fost deja platita</span>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <Link href="/rezervarile-mele">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Contul Meu
                </button>
              </Link>
            </div>
          </>
        )
      }
      if (booking?.userId != currentUser?.id) {
        return <>Acces neautorizat. Te rugam sa accesezi doar rezervarile tale!</>
      }
    }

    return (
      <>
        <div className="">
          <div className="mt-10">
            <div className="w-3/4 lg:w-1/2 mx-auto bg-white rounded-md">
              <div className="flex flex-col justify-center items-center">
                <h6 className="text-black font-bold text-xl my-4">
                  {" "}
                  {format(subHours(booking.starts_at, 3), "dd.MM.yyyy")}
                </h6>

                {booking.intrare_complex ? (
                  <div
                    className="
                flex
                justify-between
                items-center
                w-full
                py-5
                border-b-2 border-gray-200
              "
                  >
                    <p className="text-gray-400 ml-4">Taxa Agrement</p>
                    {booking?.intrare_complex > 1 ? (
                      <p className="text-black mr-4">{booking?.intrare_complex} x 15 Lei</p>
                    ) : (
                      <p className="text-black mr-4">15 Lei</p>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.loc_parcare ? (
                  <div
                    className="
                flex
                justify-between
                items-center
                w-full
                py-5
                border-b-2 border-gray-200
              "
                  >
                    <p className="text-gray-400 ml-4">Taxa Parcare</p>
                    {booking.loc_parcare > 1 ? (
                      <p className="text-black mr-4">{booking.loc_parcare} x 10 Lei</p>
                    ) : (
                      <p className="text-black mr-4"> 10 Lei</p>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.loc_pescuit.length > 0 ? (
                  <div
                    className="
          flex
          justify-between
          items-center
          w-full
          py-5
          border-b-2 border-gray-200
        "
                  >
                    <p className="text-gray-400 ml-4">
                      Taxa Loc de Pescuit ( Nr. {booking.loc_pescuit.join(", ")} )
                    </p>
                    <p className="text-black mr-4">{booking.loc_pescuit.length} x 75 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.casuta.length > 0 ? (
                  <div
                    className="
          flex
          justify-between
          items-center
          w-full
          py-5
          border-b-2 border-gray-200
        "
                  >
                    <p className="text-gray-400 ml-4">
                      Taxa Casuta ( Nr. {booking.casuta.join(", ")} )
                    </p>
                    <p className="text-black mr-4"> {booking.casuta.length} x 95 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.casuta2.length > 0 ? (
                  <div
                    className="
          flex
          justify-between
          items-center
          w-full
          py-5
          border-b-2 border-gray-200
        "
                  >
                    <p className="text-gray-400 ml-4">
                      Taxa Casuta Zatun 2 ( Nr. {booking.casuta2.join(", ")} )
                    </p>
                    <p className="text-black mr-4"> {booking.casuta2.length} x 130 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}

                <div
                  className="
                flex
                justify-between
                items-center
                w-full
                py-5
                border-b-2 border-gray-200
              "
                >
                  <p className="text-gray-400 ml-4">Total</p>
                  <p className="text-indigo-600 mr-4">{booking.total_price.toFixed(2)} Lei</p>
                </div>
                <div
                  className="
                flex flex-col
                justify-between
                items-center
                px-3
                py-5
                w-full
              "
                >
                  {query.booking ? (
                    <button
                      onClick={createCheckoutWithId}
                      className="w-full bg-indigo-600 text-white px-2 py-2 rounded-md"
                    >
                      Confirma Rezervarea
                    </button>
                  ) : (
                    <button
                      onClick={createCheckout}
                      className="w-full bg-indigo-600 text-white px-2 py-2 rounded-md"
                    >
                      Continua catre plata
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Sumar />
    </>
  )
}
export default Checkout
Checkout.getLayout = (page) => <Layout title="Checkout">{page}</Layout>
