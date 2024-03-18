import { BlitzPage } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout"

const Declined: BlitzPage = () => {
  return (
    <div>Din pacate plata a esuat. Poti intra la "Rezervarile mele" pentru a reincerca plata</div>
  )
}
export default Declined
Declined.getLayout = (page) => <Layout title="Checkout">{page}</Layout>
