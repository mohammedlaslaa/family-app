import type { AppProps } from "next/app";

import Head from "next/head";
import NavBar from "components/NavBar";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Family App</title>
      </Head>
      <NavBar />
      <main className="flex-1 flex flex-col justify-even">
        <Component {...pageProps} />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
