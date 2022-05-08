import { BlitzPage, useRouterQuery, invoke } from "blitz"
import Layout from "app/core/layouts/Layout"
import confirmOrderPaid from "./mutations/confirmOrderPaid"
const stripe = require("stripe")(
  "sk_test_51KwksbK12xH0MvuUqzI0ibWFUlkVQl6OsQqLS6eyGr6Z1I3vs6mWA8bE6qQ3FSUIsQRxszXDH1tC2uGBw4HGvMpj00F2WMUy0T"
)

const Succes: BlitzPage = () => {
  //const customer = stripe.customers.retrieve(session.customer)

  const query = useRouterQuery()
  console.log(query)
  const test = invoke(confirmOrderPaid, query.session_id)

  return <div>Felicitari! Ai platit cu succes</div>
}
export default Succes
Succes.getLayout = (page) => <Layout title="Checkout">{page}</Layout>
