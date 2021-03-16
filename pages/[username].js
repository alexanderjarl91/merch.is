import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "./context";
import { auth, db } from "./fire";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CgEnter } from "react-icons/cg";

const Store = () => {
  const router = useRouter();
  const { users } = useContext(UsersContext);

  const storeNameQuery = router.query ? router.query.username : null;
  const storeOwner = users.find((x) => x.store.name == storeNameQuery);
  const store = storeOwner ? storeOwner.store : null;

  useEffect(() => {
    if (!store) {
      // router.push("/hafa_samband");
    }
  }, [users]);

  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <h1>merch.</h1>

      {store ? (
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <h2>{storeOwner.store.name}</h2>
          <img src={store.logo} />
          <p>{store.url}</p>
          <p>{store.bio}</p>

          {/* {store
            ? store.products.map((product) => (
                <p style={{ color: "black" }}>product</p>
              ))
            : null} */}
        </div>
      ) : null}

      <div>
        <p style={{ color: "black" }}>footer text</p>
      </div>
    </div>
  );
};

export default Store;
