import { gSSP } from "app/blitz-server";
import { getSession } from "@blitzjs/auth";

export const getServerSideProps = gSSP(async ({ req, res }) => {
  const session = await getSession(req, res)

  if (!session.userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return { props: {} }
})
