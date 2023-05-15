import { parseISO } from "date-fns"

export default async function getDate() {
  const rawData = await fetch("https://baltazatun.ro/api/getDate")
  const json = await rawData.json()
  const date = json.date
  return parseISO(date)
}
