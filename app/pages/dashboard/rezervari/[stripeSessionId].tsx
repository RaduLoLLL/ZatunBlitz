import { useParam, useQuery, BlitzPage, getSession, invoke, Router } from "blitz"
import getBookingBySessionId from "./queries/getBookingBySessionId"
import { Suspense } from "react"
import Sidebar from "../../../components/Sidebar"
import { format, subHours } from "date-fns"
import insertVerificare from "../mutations/insertVerificare"
import toast from "react-hot-toast"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (
    session.role != "ADMIN" &&
    session.role != "CONTABIL" &&
    session.role != "PORTAR" &&
    session.role != "SUPERADMIN"
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Rezervare: BlitzPage = () => {
  const stripeSessionId = useParam("stripeSessionId")

  const DisplayBooking = () => {
    const booking = useQuery(getBookingBySessionId, stripeSessionId)[0]

    async function verificaBilet(booking_id) {
      const verificare = toast.loading("Se inregistreaza intrarea")
      const res = await invoke(insertVerificare, booking_id)
        .then((res) => {
          res && toast.success("Inregistrare realizata cu succes", { id: verificare })
          !res && toast.error("Whoops, a intervenit o eroare", { id: verificare })
        })
        .then(() => {
          Router.push("/dashboard/rezervari")
        })
    }

    return (
      <>
        <div className="">
          <div className="mt-10">
            <div className="w-3/4 lg:w-1/2 mx-auto bg-white rounded-md">
              <div className="flex flex-col justify-center items-center">
                <h6 className="text-black font-medium my-4">Sumarul Rezevarii</h6>
                {booking?.starts_at ? (
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
                    <p className="text-gray-400 ml-4">Data</p>
                    <p className="mr-4">{format(subHours(booking.starts_at, 3), "dd.MM.yyyy")}</p>
                  </div>
                ) : (
                  <></>
                )}
                {booking?.User ? (
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
                    <p className="text-gray-400 ml-4">Nume</p>
                    <div className="flex space-x-2 mr-4">
                      {booking?.User?.name ? <span>{booking.User.name}</span> : <></>}
                      {booking?.User?.surname ? <span>{booking.User.surname}</span> : <></>}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {booking?.intrare_complex ? (
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
                    <p className="text-gray-400 ml-4">Bilete intrare complex</p>
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
                    <p className="text-gray-400 ml-4">Loc de Parcare</p>
                    {booking.loc_parcare > 1 ? (
                      <p className="text-black mr-4">{booking.loc_parcare} x 10 Lei</p>
                    ) : (
                      <p className="text-black mr-4"> 10 Lei</p>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.loc_pescuit.length ? (
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
                      Loc de Pescuit ( Nr. {booking?.loc_pescuit.join(", ")} )
                    </p>
                    <p className="text-black mr-4">{booking?.loc_pescuit.length} x 75 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.casuta.length ? (
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
                    <p className="text-gray-400 ml-4">Casuta ( Nr. {booking.casuta.join(", ")} )</p>
                    <p className="text-black mr-4"> {booking.casuta.length} x 95 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}
                {booking?.casuta2.length ? (
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
                      Casuta Zatun 2 ( Nr. {booking.casuta2.join(", ")} )
                    </p>
                    <p className="text-black mr-4"> {booking.casuta2.length} x 130 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
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
                <p className="text-indigo-600 mr-4">{booking?.total_price.toFixed(2)} Lei</p>
              </div>
              {booking?.verificat ? (
                <></>
              ) : (
                <div className="flex justify-center mt-12">
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    onClick={() => {
                      verificaBilet(booking?.id)
                    }}
                  >
                    Confirma Intrarea
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>{" "}
      </>
    )
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <div className="ping"></div>
          </div>
        }
      >
        <Sidebar />
      </Suspense>
      <Suspense fallback="...">
        <DisplayBooking />
      </Suspense>
    </>
  )
}
export default Rezervare
