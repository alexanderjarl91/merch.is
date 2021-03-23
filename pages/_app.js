import "../styles/globals.css";
import { UsersProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <UsersProvider>
      <Component {...pageProps} />
    </UsersProvider>
  );
}

export default MyApp;
