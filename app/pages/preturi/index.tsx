import Layout from "app/core/layouts/Layout"
import { BlitzPage, Head, Image } from "blitz"

const Preturi: BlitzPage = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-12">
        <p style={{ fontFamily: "Josefin Slab" }} className="text-DEB52D text-5xl">
          Lista de preturi
        </p>
        <p className="text-7xl font-light mt-5" style={{ fontFamily: "Josefin Sans" }}>
          Balta Zătun
        </p>

        <div className="min-w-full flex  justify-center mt-6">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/3">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Serviciu
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Preț
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Bilet Agrement
                  </th>
                  <td className="px-6 py-4">10 Lei</td>
                </tr>
                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Loc Pescuit
                  </th>
                  <td className="px-6 py-4">50 Lei</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Loc Parcare
                  </th>
                  <td className="px-6 py-4">5 Lei</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default Preturi
Preturi.getLayout = (page) => <Layout title="Preturi">{page}</Layout>
