import { useContext } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "./context";
import { auth, db } from "./fire";
import Footer from "../components/Footer";

const Store = () => {
  const router = useRouter();
  const storeNameQuery = router.query ? router.query.username : null;
  const { users } = useContext(UsersContext);

//   useEffect(() => {

//   }, [])
//   const storeOwner = users.find((x) => x.store.name == storeNameQuery);
//   const store = storeOwner.store;
//   const products = storeOwner.products;
//   console.log(store)

  //query firebase, match user, else redirect to 404

  return (
    <>
      {/* <h2>merch logo</h2>
      <img src={store.logo} alt=""/>
      <h1>{store.name}</h1>

      <p>{store.url}</p>

      <p>{store.bio}</p> */}


      <Footer />
    </>
  );
};

export default Store;

