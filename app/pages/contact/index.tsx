import Layout from "app/core/layouts/Layout"
import { BlitzPage, Head, Image } from "blitz"
import Form from "./components/Form"

const Contact: BlitzPage = () => {
  return (
    <>
      <div className=" mt-20 mb-20">
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26424.5187049245!2d28.174998064376766!3d45.42773611778083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b6de494824b96b%3A0xe7a4b0ec140ffb48!2sZ%C4%83tun%20S.A.!5e0!3m2!1sen!2sro!4v1664822343626!5m2!1sen!2sro"
            width="1620"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <div className=" mt-24 lg:flex lg:justify-center space-x-72 lg:mx-72 mx-2">
          <div>
            <p style={{ fontFamily: "Josefin Slab" }} className="text-DEB52D text-5xl">
              Contact
            </p>
            <p
              style={{ fontFamily: "Josefin Sans" }}
              className="font-light text-6xl mt-5 lg:text-justify"
            >
              Unde ne găsiți?
            </p>
            <div className=" mt-12">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p
                  style={{ fontFamily: "Josefin Sans" }}
                  className="font-light text-4xl lg:text-justify ml-7"
                >
                  Calea Prutului Nr. 87 Galati
                </p>
              </div>

              <div className="flex items-center mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <p
                  style={{ fontFamily: "Josefin Sans" }}
                  className="font-light text-4xl lg:text-justify ml-7"
                >
                  +(40) 746 068 113
                </p>
              </div>

              <div className="flex items-center mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path d="M19.5 22.5a3 3 0 003-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 01-.712 1.321l-5.683-3.06a1.5 1.5 0 00-1.422 0l-5.683 3.06a.75.75 0 01-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 003 3h15z" />
                  <path d="M1.5 9.589v-.745a3 3 0 011.578-2.641l7.5-4.039a3 3 0 012.844 0l7.5 4.039A3 3 0 0122.5 8.844v.745l-8.426 4.926-.652-.35a3 3 0 00-2.844 0l-.652.35L1.5 9.59z" />
                </svg>

                <p
                  style={{ fontFamily: "Josefin Sans" }}
                  className="font-light text-4xl lg:text-justify ml-7"
                >
                  secretariat@spjadppgalati.ro
                </p>
              </div>

              <div className="flex items-center mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <p
                  style={{ fontFamily: "Josefin Sans" }}
                  className="font-light text-4xl lg:text-justify ml-7"
                >
                  L-V 06ºº- 20ºº
                </p>
              </div>
            </div>
          </div>
          <div className="mt-24 lg:mt-0">
            {" "}
            <Form />
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
Contact.getLayout = (page) => <Layout title="Contact">{page}</Layout>
