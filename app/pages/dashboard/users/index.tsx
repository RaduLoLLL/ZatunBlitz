import { BlitzPage, useQuery, getSession, Link, Routes, useRouterQuery } from "blitz"
import Sidebar from "../../../components/Sidebar"
import getAllUsers from "../queries/getAllUsers"
import { Suspense, useState } from "react"

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.role != "ADMIN" && session.role != "CONTABIL") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Users: BlitzPage = () => {
  const router = useRouterQuery()

  const [state, setState] = useState({
    sessionId: "",
    name: router.name,
    surname: router.surname,
    email: router.email,
    phone: router.phone,
  })
  const handleInputChange = (evt) => {
    const name = evt.target.name
    const value = evt.target.value
    setState({ ...state, [name]: value })
  }
  const UsersTable = () => {
    const users = useQuery(getAllUsers, state)[0]

    return (
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 mt-6">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
              <tr>
                <th
                  scope="col"
                  className="p-4 text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Nume
                </th>
                <th
                  scope="col"
                  className="p-4 text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="p-4 text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Numar de telefon
                </th>
                <th
                  scope="col"
                  className="p-4 text-left text-xs font-bold  uppercase tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((user, i) => {
                return (
                  <tr className={i % 2 ? "bg-gray-50" : ""} key={user.id}>
                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {user.name} {user.surname}
                    </td>

                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {user.email}
                    </td>

                    <td
                      className={
                        i % 2
                          ? "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                          : "p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                      }
                    >
                      {user.phone}
                    </td>
                    <td
                      className={
                        "py-2 whitespace-nowrap text-sm font-normal text-gray-900 text-right"
                      }
                    >
                      <Link
                        href={{
                          pathname: "/dashboard/rezervari",
                          query: {
                            name: user.name,
                            surname: user.surname,
                            email: user.email,
                            phone: user.phone,
                          },
                        }}
                      >
                        <button
                          type="button"
                          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          Vezi rezervarile utilizatorului
                        </button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="flex overflow-hidden bg-white pt-16">
        <Suspense
          fallback={
            <div className="min-h-screen flex justify-center items-center">
              <div className="ping"></div>
            </div>
          }
        >
          <Sidebar />
        </Suspense>

        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4 min-h-screen">
              <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4 ">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nume"
                      onChange={handleInputChange}
                      value={state.name}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="surname"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Prenume"
                      onChange={handleInputChange}
                      value={state.surname}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Email"
                      onChange={handleInputChange}
                      value={state.email}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Numar de telefon"
                      onChange={handleInputChange}
                      value={state.phone}
                    />
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex justify-center items-center">
                        <div className="ping"></div>
                      </div>
                    }
                  >
                    <UsersTable />
                  </Suspense>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
Users.authenticate = { redirectTo: Routes.Home() }
export default Users
