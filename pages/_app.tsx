// pages/_app.tsx

// import type { ReactElement, ReactNode } from 'react'
// import type { NextPage } from 'next'
// import type { AppProps } from 'next/app'

// type NextPageWithLayout = NextPage & {
//   getLayout?: (page: ReactElement) => ReactNode
// }

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout
// }

// export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//   // Use the layout defined at the page level, if available
//   const getLayout = Component.getLayout ?? ((page) => page)

//   return getLayout(<Component {...pageProps} />)
// }


import '../styles/globals.css'
import '../styles/style.css'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'

type NextPageWithLayout = NextPage & {
  layout?: React.ElementType
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

interface ChildElement {
  children: React.ReactElement
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const Layout = Component.layout || (({ children }: ChildElement) => <>{children}</>);

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#333" />
          <meta name="description" content="Admin dashboard using NextJS" />
          <meta name='keywords' content='Admin dashboard using NextJS' />
          <meta name='author' content='ichsankurnia' />
          <link rel="apple-touch-icon" href="/favicon.ico" />

          <title>AppName</title>

          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </>
    );
}