import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "./context";
import Link from "next/link";
import styles from "../styles/Store.module.css";
import Footer from "../components/Footer";

const Store = () => {
  const router = useRouter();
  const { users } = useContext(UsersContext);
  const storeNameQuery = router.query ? router.query.username : null;
  const storeOwner = users.find((x) => x.store.url == storeNameQuery);
  const store = storeOwner ? storeOwner.store : null;
  useEffect(() => {
    if (storeNameQuery && !storeOwner) {
      router.push("/404");
    }
  }, [users]);
  return (
    <div className={styles.container}>
      <Link href="/">
        <h1 className={styles.logo}> merch. </h1>
      </Link>
      {store ? (
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <img className={styles.store_img} src={store.logo} />
          <h2 className={styles.store_title}>{storeOwner.store.name}</h2>
          <p className={styles.store_social}>{store.social}</p>
          <p className={styles.store_bio}>{store.bio}</p>
          <div className={styles.grid}>
            {storeOwner.products.map((product) => {
              console.log("product");
              return (
                <Link
                  href={`/${storeNameQuery}/${product.productName}`}
                  key={product.productImg}
                >
                  <div className={styles.product}>
                    <img
                      className={styles.product_img}
                      src={product.productImg}
                    />
                    <p className={styles.product_name}>{product.productName}</p>
                    <p className={styles.product_price}>
                      {product.productPrice} ISK
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
};
export default Store;
