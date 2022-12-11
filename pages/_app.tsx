import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavbarComponent from "../components/ui/navbar.component";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavbarComponent />
      <Head>
        <title>Chat Ore</title>
        <meta name="description" content="A Chat application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
