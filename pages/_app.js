import "../styles/globals.css";
import { UsersProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <UsersProvider>
        <Head>
        <title>merch.</title>
        <meta name="description" content="Merch has a lot of options to sell your product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </UsersProvider>
  );
}

export default MyApp;
