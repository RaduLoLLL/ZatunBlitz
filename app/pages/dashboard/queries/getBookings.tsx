import db from "db"

export default async function getBookgins(params) {
  console.log(params)
  return db.booking.findMany({
    where: {
      OR: [
        {
          User: {
            OR: [
              { name: { contains: params.name ? params.name : undefined } },
              { surname: { contains: params.surname ? params.surname : undefined } },
              { email: { contains: params.email ? params.email : undefined } },
              { phone: { contains: params.phone ? params.phone : undefined } },
            ],
          },
        },
        {
          stripeSessionId: { equals: params.sessionId },
        },
      ],
    },
    take: 20,

    include: { User: true },
  })
}
