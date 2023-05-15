import Layout from "app/core/layouts/Layout"
import { BlitzPage, Image } from "blitz"
import { NextSeo } from "next-seo"

const ManualUtilizare: BlitzPage = () => {
  return (
    <>
      <NextSeo
        title="Balta Zatun Galati - Manual de Utilizare"
        description="Balta Zatun Galati este un complex de agrement situat pe malul Dunarii, la circa 15 km distanță de municipiul Galați. Este cea mai apropiată bază de agrement pentru pescari, având un luciu de apă de 28 de ha în care se află diverse specii de pește, de la crap și caras până la știucă."
      />
      <div className="mt-24 mx-12 lg:mx-44 flex flex-col justify-center items-center space-y-6">
        {
          //create a new array with elements from 1 to 10
          Array.from(Array(10).keys()).map((_, index) => (
            <div key={index} className="">
              <p className="text-black text-3xl font-bold">Pasul {index + 1}</p>
              <Image src={`/regulament/${index + 1}.jpg`} width={950} height={477} />
            </div>
          ))
        }
      </div>
    </>
  )
}
export default ManualUtilizare
ManualUtilizare.getLayout = (page) => <Layout title="Manual de Utilizare">{page}</Layout>
