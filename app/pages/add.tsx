import { BlitzPage, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import addDays from "date-fns/addDays"
import format from "date-fns/format"
import subDays from "date-fns/subDays"
import getAvailableBooking from "app/queries/getBooking"

const Add: BlitzPage = () => {
  const [state, setState] = useState({
    intrare: 1,
    locParcare: 0,
    locPescuit: 0,
    casuta: 0,
    sezlong: 0,
    sedintaFoto: false,
    petrecerePrivata: false,
    totalPrice: 0,
  })
  const [startDate, setStartDate] = useState(addDays(new Date(), 1))
  const [endDate, setEndDate] = useState(addDays(startDate, 1))

  const handleSubmit = (event) => {
    event.preventDefault()
    setEndDate({ endDate: startDate + 1 })
    if (state.petrecerePrivata === true) {
      setState({
        ...state,
        intrare: 0,
        locParcare: 0,
        locPescuit: 0,
        casuta: 0,
        sezlong: 0,
        sedintaFoto: false,
        totalPrice: 100,
      })
    }
    setStartDate({ startDate: format(startDate, "dd") })
    console.log(state)
    console.log(startDate)
    console.log(endDate)
  }
  const handleChange = (evt) => {
    const name = evt.target.name
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value
    setState({
      ...state,
      [name]: value,
    })
    console.log(state)
  }
  return (
    <div className="mx-auto max-w-xs ">
      <div className="my-10 p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Fa o rezervare noua</h5>
          {state.petrecerePrivata ? (
            <>
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Alege Data
                </label>
                <div className="border-2 rounded">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    includeDateIntervals={[{ start: new Date(), end: addDays(new Date(), 30) }]}
                    className="cursor-pointer p-2"
                  />
                </div>
              </div>
              <label
                htmlFor="checked-toggle"
                className="relative inline-flex items-center mb-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="petrecerePrivata"
                  id="checked-toggle"
                  className="sr-only peer"
                  checked={state.petrecerePrivata}
                  onChange={handleChange}
                />

                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Petrecere Privata
                </span>
              </label>
            </>
          ) : (
            <>
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Alege Data
                </label>
                <div className="border-2 rounded">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    includeDateIntervals={[{ start: new Date(), end: addDays(new Date(), 30) }]}
                    className="cursor-pointer p-2"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="intrare"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Bilete Intrare Complex
                </label>
                <input
                  type="number"
                  name="intrare"
                  id="intrare"
                  placeholder="1"
                  value={state.intrare}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="loParcare"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Numar Locuri de Parcare
                </label>
                <input
                  type="number"
                  name="locParcare"
                  id="locParcare"
                  placeholder="0"
                  min="0"
                  value={state.locParcare}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="locPescuit"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Alege Locul de Pescuit
                </label>
                <input
                  type="number"
                  name="locPescuit"
                  id="locPescuit"
                  placeholder="0"
                  min="0"
                  max="114"
                  value={state.locPescuit}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="casuta"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Alege Casuta
                </label>
                <input
                  type="number"
                  name="casuta"
                  id="casuta"
                  placeholder="0"
                  min="0"
                  max="18"
                  value={state.casuta}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="sezlong"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Alege Sezlong
                </label>
                <input
                  type="number"
                  name="sezlong"
                  id="sezlong"
                  placeholder="0"
                  min="0"
                  max="21"
                  value={state.sezlong}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <label
                htmlFor="sedintaFoto"
                className="relative inline-flex items-center mb-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="sedintaFoto"
                  id="sedintaFoto"
                  className="sr-only peer"
                  checked={state.sedintaFoto}
                  onChange={handleChange}
                />

                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Sedinta foto
                </span>
              </label>
              <label
                htmlFor="petrecerePrivata"
                className="relative inline-flex items-center mb-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="petrecerePrivata"
                  id="petrecerePrivata"
                  className="sr-only peer"
                  checked={state.petrecerePrivata}
                  onChange={handleChange}
                />

                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Petrecere Privata
                </span>
              </label>
            </>
          )}

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Subimt
          </button>
        </form>
      </div>
    </div>
  )
}
export default Add
Add.getLayout = (page) => <Layout title="Add Booking">{page}</Layout>
