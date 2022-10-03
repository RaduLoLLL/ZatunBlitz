import { BlitzPage, getSession, Head, Image, Link, Routes, useSession } from "blitz"
import CookieConsent from "react-cookie-consent"

import Navbar from "./components/Navbar"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session?.role === "ADMIN" || session.role === "CONTABIL") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    }
  }
  if (session?.role === "PORTAR") {
    return {
      redirect: {
        destination: Routes.VerificareBilet(),
        permanent: true,
      },
    }
  }

  return { props: {} }
}

export const UserInfo = () => {
  return <Navbar />
}

const Home: BlitzPage = () => {
  return (
    <>
      <div className="container min-w-full">
        <div className="block md:flex md:min-h-screen">
          <div
            className="block md:w-4/6 relative group min-h-screen "
            style={{
              backgroundImage: "url(/Main-3.webp)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className=" z-50 justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out absolute from-black  to-transparent bg-gradient-to-t inset-0 text-white flex items-center">
              <div className="flex flex-col justify-center items-center mx-auto md:ml-12">
                <div
                  className="text-6xl md:text-8xl text-center"
                  style={{ fontFamily: "Amatic SC" }}
                >
                  Balta Zatun
                </div>
                <div className="text-4xl md:text-7xl" style={{ fontFamily: "Josefin Slab" }}>
                  Complex de Agrement
                </div>

                <Link href={Routes.Add()}>
                  <div
                    className=" mt-20 border border-white p-3 hover:bg-white hover:text-black/80 transition duration-300 ease-in-out cursor-pointer text-4xl md:text-5xl"
                    style={{ fontFamily: "Josefin Slab" }}
                  >
                    Rezerva Acum
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="block md:flex md:flex-col md:w-2/6 ">
            <div
              className="min-h-screen md:min-h-min md:h-1/2 relative group"
              style={{
                backgroundImage: "url(/ContulMeu-3.webp)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <Link href={Routes.RezervarileMele()}>
                <div className="flex cursor-pointer justify-center z-50 opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out absolute from-black  to-transparent bg-gradient-to-t inset-0 pt-30 text-white  items-center md:items-end">
                  <div className="text-5xl mb-9" style={{ fontFamily: "Josefin Slab" }}>
                    <p>Contul Meu</p>
                  </div>
                </div>
              </Link>
            </div>
            <Link href={Routes.DespreNoi()}>
              <div
                className="min-h-screen md:min-h-min md:h-1/2 relative group"
                style={{
                  backgroundImage: "url(/DespreNoi-3.webp)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="flex cursor-pointer justify-center z-50 opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out absolute from-black  to-transparent bg-gradient-to-t inset-0 pt-30 text-white  items-center md:items-end">
                  <div className="text-5xl mb-9" style={{ fontFamily: "Josefin Slab" }}>
                    <p>Despre Noi</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <CookieConsent
          location="bottom"
          cookieName="cookies"
          expires={999}
          overlay
          buttonText={"Sunt de acord"}
        >
          Acest site folosește cookies.
        </CookieConsent>
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true

export default Home
