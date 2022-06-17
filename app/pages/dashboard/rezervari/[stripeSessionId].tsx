import { useParam, useQuery, BlitzPage, getSession } from "blitz"
import getBookingBySessionId from "./queries/getBookingBySessionId"
import { Suspense } from "react"
import Sidebar from "../components/Sidebar"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "ADMIN") {
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

    return (
      <>
        <div className="">
          <div className="mt-10">
            <div className="w-3/4 lg:w-1/2 mx-auto bg-white rounded-md">
              <div className="flex flex-col justify-center items-center">
                <h6 className="text-black font-medium my-4">Sumarul Rezevarii</h6>
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
                      <p className="text-black mr-4">{booking?.intrare_complex} x 20 Lei</p>
                    ) : (
                      <p className="text-black mr-4">20 Lei</p>
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
                      <p className="text-black mr-4">{booking.loc_parcare} x 5 Lei</p>
                    ) : (
                      <p className="text-black mr-4"> 5 Lei</p>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.loc_pescuit ? (
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
                    <p className="text-black mr-4">{booking?.loc_pescuit.length} x 50 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.casuta ? (
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
                    <p className="text-black mr-4"> {booking.casuta.length} x 100 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.sezlong ? (
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
                    <p className="text-gray-400 ml-4">Sezlongul ( Nr. {booking.sezlong} )</p>
                    <p className="text-black mr-4"> 15 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.sedinta_foto ? (
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
                    <p className="text-gray-400 ml-4">Sedinta Foto</p>
                    <p className="text-black mr-4"> 100 Lei</p>
                  </div>
                ) : (
                  <div></div>
                )}

                {booking?.petrecere_privata ? (
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
                    <p className="text-gray-400 ml-4">Petrecere Privata</p>
                    <p className="text-black mr-4"> 200 Lei</p>
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
                <p className="text-indigo-600 mr-4">{booking?.total_price} Lei</p>
              </div>
            </div>
          </div>
        </div>{" "}
      </>
    )
  }

  return (
    <>
      <Sidebar />
      <Suspense fallback="...">
        <DisplayBooking />
      </Suspense>
    </>
  )
}
export default Rezervare
