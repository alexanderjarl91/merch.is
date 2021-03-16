import "../styles/globals.css";
import { UsersContext, UsersProvider } from "./context";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <UsersProvider>
        <Component {...pageProps} />
      </UsersProvider>
    </Layout>
  );
}

export default MyApp;
