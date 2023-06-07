import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import { motion } from "framer-motion"

import "app/core/styles/index.css"
import { Toaster } from "react-hot-toast"
import Announcement from "./components/Announcement"
import { Suspense, useEffect } from "react"
import { Analytics } from "@vercel/analytics/react"
import Cookies from "universal-cookie"

export default function App({ Component, pageProps, router }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const cookies = new Cookies()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      <motion.div
        initial="initial"
        key={router.route}
        animate="animate"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
        }}
      >
        <div>
          <Toaster />
          <Suspense fallback={<div />}>
            <Announcement text="" />
          </Suspense>
        </div>
        {getLayout(<Component {...pageProps} />)}
      </motion.div>
      <Analytics />
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
