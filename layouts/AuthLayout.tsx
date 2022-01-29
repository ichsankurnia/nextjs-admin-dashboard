import Head from "next/head";
import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    titlePage: string
};

export default function AuthLayout({children, titlePage}: Props) {
  return (
      <>
        <Head>
            <title>{titlePage || 'Dashboard'}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
            <nav>AuthLayout Navbar</nav>
            <main>
                {children}
            </main>
            <footer>AuthLayout Footer</footer>
        </div>
      </>
  )
}
