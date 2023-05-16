import db from "db"

export default async function getLocalBooking() {
  return await db.booking.findMany({
    where: {
      OR: [
        { User: { email: "acces1@baltazatun.ro" } },
        { User: { email: "acces2@baltazatun.ro" } },
        { User: { email: "contabilitate@baltazatun.ro" } },
      ],
    },
  })
}
