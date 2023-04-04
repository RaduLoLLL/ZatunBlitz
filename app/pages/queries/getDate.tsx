import { parseISO } from "date-fns"

export default async function getDate() {
  const rawData = await fetch("https://zatun-blitz-git-production-radulolll.vercel.app/api/getDate")
  const json = await rawData.json()
  const date = json.date
  return parseISO(date)
}
