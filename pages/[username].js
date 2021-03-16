import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "./context";
import { auth, db } from "./fire";
import Footer from "../components/Footer";

const Store = () => {
  const router = useRouter();
  const { users } = useContext(UsersContext);

  const storeNameQuery = router.query ? router.query.username : null;
  const storeOwner = users.find((x) => x.store.name == storeNameQuery);
  const store = storeOwner ? storeOwner.store : null;

  useEffect(() => {
    if (!store) {
      router.push("hafa_samband");
    }
  }, [users]);

  return (
    <>
      {store ? (
        <div>
          <h2>{storeOwner.store.name}</h2>
          <img src={store.logo} />
          <p>{store.url}</p>
          <p>{store.bio}</p>
          {store.products.map((product) => (
            <p>product</p>
          ))}
        </div>
      ) : null}

      <Footer />
    </>
  );
};

export default Store;
