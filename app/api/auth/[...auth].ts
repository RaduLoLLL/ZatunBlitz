import { passportAuth } from "blitz"
import db from "db"
import { Strategy as GoogleAuth } from "passport-google-oauth20"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      strategy: new GoogleAuth(
        {
          scope: ["email", "profile"],
          authorizationURL: "https://accounts.google.com/o/oauth2/auth",
          tokenURL: "https://accounts.google.com/o/oauth2/token",
          clientID: "892847437429-n0jcmcebjjesp8939afak7h23qu26le3.apps.googleusercontent.com",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            process.env.NODE_ENV === "production"
              ? "https://www.baltazatun.ro/api/auth/google/callback"
              : "http://localhost:3000/api/auth/google/callback",
          includeEmail: true,
        },

        async function (_token, _tokenSecret, profile, done) {
          const email = profile.emails[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Google OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "gooogle",
          }
          done(undefined, { publicData })
        }
      ),
    },
  ],
})
