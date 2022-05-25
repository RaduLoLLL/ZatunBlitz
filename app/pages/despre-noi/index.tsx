import Layout from "app/core/layouts/Layout"
import { BlitzPage, Head, Image } from "blitz"
import Navbar from "../components/Navbar"

const DespreNoi: BlitzPage = () => {
  return (
    <>
      <div className="mt-24 mx-12 lg:mx-44 lg:mr-12 flex items-center mb-12">
        <div className="max-w-2xl">
          <p style={{ fontFamily: "Josefin Slab" }} className="text-DEB52D text-5xl">
            Despre Noi
          </p>
          <p className="text-7xl font-light mt-5" style={{ fontFamily: "Josefin Sans" }}>
            What is lorem ipsum?
          </p>
          <p style={{ fontFamily: "Josefin Sans" }} className="font-thin text-4xl mt-10">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages.
          </p>
        </div>
        <div className="relative ml-16 hidden xl:block">
          <Image src="/DespreNoiImage.png" width={747} height={660} />
        </div>
      </div>
    </>
  )
}
export default DespreNoi
DespreNoi.getLayout = (page) => <Layout title="Despre Noi">{page}</Layout>
