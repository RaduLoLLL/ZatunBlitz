import { BlitzPage, getSession, Router, Image, Head, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import NavbarLogedIn from "app/pages/components/NavbarLogedIn"
import NavbarLogedOut from "app/pages/components/NavbarLogedOut"
import MainImg from "public/Main.png"
import ContulMeuImg from "public/ContulMeu.png"
import DespreNoiImg from "/public/DespreNoi.png"
import Navbar from "./components/Navbar"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role === "ADMIN") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    }
  }

  return { props: {} }
}

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  // if (currentUser) {
  //   return (
  //     <>
  //       <div className="container min-w-full">
  //         <NavbarLogedIn />
  //       </div>
  //     </>
  //   )
  // } else {
  //   return (
  //     <>
  //       <NavbarLogedOut />
  //     </>
  //   )
  // }
  return <Navbar />
}
/*
<div className="bg-red-500">
              <div className="overflow-hidden aspect-square relative group">
                <div className=" z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out  absolute from-black  to-transparent bg-gradient-to-t inset-0 pt-30 text-white flex items-center">
                  <div className="  p-4  text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10  transition duration-300 ease-in-out">
                    <div className="flex flex-col justify-center items-center">
                      <div
                        className=""
                        style={{ fontFamily: "Amatic SC", fontSize: 144, height: 100 }}
                      >
                        Balta Zatun
                      </div>

                      <div className="" style={{ fontFamily: "Josefin Slab", fontSize: 80 }}>
                        Complex de Agrement
                      </div>

                      <div
                        className="mt-40 border border-white px-5 py-8 hover:bg-white hover:text-black/80 transition duration-300 ease-in-out cursor-pointer"
                        style={{ fontFamily: "Josefin Slab", fontSize: 80, height: 80 }}
                      >
                        Rezerva Acum
                      </div>
                    </div>
                  </div>
                </div>

                <Image src={MainImg} layout="fill" />
              </div>
            </div>
*/

const Home: BlitzPage = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="container min-w-full">
        <div className="block md:flex md:min-h-screen">
          <div
            className="md:w-4/6 md:relative group min-h-screen "
            style={{
              backgroundImage: "url(/Main.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className=" z-50 opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out absolute from-black  to-transparent bg-gradient-to-t inset-0 pt-30 text-white flex items-center">
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
                backgroundImage: "url(/ContulMeu.png)",
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
                  backgroundImage: "url(/DespreNoi.png)",
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
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true

export default Home
