import { BlitzPage, Image, Link, Routes, Head } from "blitz"
import { BeakerIcon, MenuIcon } from "@heroicons/react/solid"
import { StarIcon } from "@heroicons/react/outline"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div>
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
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Josefin+Slab&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="flex items-center justify-between xl:px-44 flex-1 sm:shadow-md xl:shadow-xl shadow-slate-200 px-4 py-2 z-50">
        <Link href={Routes.Home()}>
          <div className="relative h-20 w-20 xl:h-32 xl:w-32 flex-shrink-0 cursor-pointer">
            <Image src="/Logo.svg" layout="fill" />
          </div>
        </Link>
        <div>
          <ul
            className="hidden xl:flex font-light text-3xl space-x-14"
            style={{ fontFamily: "Josefin Sans" }}
          >
            <Link href={Routes.Home()}>
              <li className="cursor-pointer hover:text-DEB52D">Acasa</li>
            </Link>
            <Link href={Routes.DespreNoi()}>
              <li className="cursor-pointer hover:text-DEB52D">Despre Noi</li>
            </Link>
            <Link href={Routes.RezervarileMele()}>
              <li className="cursor-pointer hover:text-DEB52D">Contul Meu</li>
            </Link>
            <li className="cursor-pointer hover:text-DEB52D">Contact</li>
          </ul>
          <div>
            <MenuIcon
              onClick={() => setIsOpen(!isOpen)}
              className="h-6 w-6 xl:hidden cursor-pointer"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="relative">
          <div
            className="xl:hidden space-y-2 z-50 bg-slate-200 font-light text-2xl transition duration-300 ease-in-out absolute top-0 w-full "
            style={{ fontFamily: "Josefin Sans" }}
          >
            <Link href={Routes.Home()}>
              <div className="w-full flex justify-center hover:bg-slate-300 cursor-pointer">
                Acasa
              </div>
            </Link>
            <Link href={Routes.DespreNoi()}>
              <div className="w-full flex justify-center hover:bg-slate-300 cursor-pointer">
                Despre Noi
              </div>
            </Link>
            <Link href={Routes.RezervarileMele()}>
              <div className="w-full flex justify-center hover:bg-slate-300 cursor-pointer">
                Contul Meu
              </div>
            </Link>
            <div className="w-full flex justify-center hover:bg-slate-300 cursor-pointer">
              Contact
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
