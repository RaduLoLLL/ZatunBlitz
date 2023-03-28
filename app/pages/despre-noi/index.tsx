import Layout from "app/core/layouts/Layout"
import { BlitzPage, Image } from "blitz"
import { NextSeo } from "next-seo"

const DespreNoi: BlitzPage = () => {
  return (
    <>
      <NextSeo
        title="Balta Zatun Galati - Despre Noi"
        description="Balta Zatun Galati este un complex de agrement situat pe malul Dunarii, la circa 15 km distanță de municipiul Galați. Este cea mai apropiată bază de agrement pentru pescari, având un luciu de apă de 28 de ha în care se află diverse specii de pește, de la crap și caras până la știucă."
      />
      <div className="mt-24 mx-12 lg:mx-44 lg:mr-12 flex items-center mb-12">
        <div className="max-w-2xl">
          <p style={{ fontFamily: "Josefin Slab" }} className="text-DEB52D text-5xl">
            Despre Noi
          </p>
          <p className="text-7xl font-light mt-5" style={{ fontFamily: "Josefin Sans" }}>
            Balta Zătun
          </p>
          <p
            style={{ fontFamily: "Josefin Sans" }}
            className="font-thin text-4xl mt-10 lg:text-justify"
          >
            Complexul de Agrement Balta Zătun se află pe malul Dunării, la circa 15 km distanță de
            municipiul Galați. Este cea mai apropiată bază de agrement pentru pescari, având un
            luciu de apă de 28 de ha în care se află diverse specii de pește, de la crap și caras
            până la știucă. Lacul Zătun este aflat în incinta îndiguită Bădălan, din dreptul Milei
            fluviale 76 (zona Cotul Pisicii de pe Dunăre) şi face parte din Parcul Natural Lunca
            Joasă a Prutului Inferior. Accesul se face pe E87 Galaţi-Giurgiuleşti. Se face dreapta
            după traversarea canalului de irigaţii şi se continuă pe şoseaua asfaltată (DJ 251E) de
            pe digul de apărare al Dunării. Vizitatorii bazei de agrement Zătun beneficiază de
            urmatoarele facilităţi: zonă de popas pentru relaxare în aer liber (prevazută cu umbrele
            din stuf, şezlonguri din lemn şi măsuţe); grătare; bănci; mese; zonă de plajă; căsuţe;
            locuri de joacă; pontoane; refugii amenajate în stil tradiţional; foişoare de observare
            a faunei şi florei
          </p>
        </div>
        <div className="relative ml-16 hidden xl:block">
          <Image src="/DespreNoiImage-3.webp" width={747} height={660} />
        </div>
      </div>
    </>
  )
}
export default DespreNoi
DespreNoi.getLayout = (page) => <Layout title="Despre Noi">{page}</Layout>
