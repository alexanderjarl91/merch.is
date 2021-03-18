import styles from "../../styles/Dashboard/Products.module.css";
import { db } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Products() {
  const { userData, refreshUserData } = useContext(UsersContext);

  //refresh data when component mounts
  useEffect(() => {
    refreshUserData();
  }, []);

  useEffect(() => {
    console.log("userData changed, dom rerendered");
  }, [userData]);

  const handleDelete = async (productId) => {
    //filter out the clicked item
    const firestoreUser = await db.collection("users").doc(userData.email);
    const userSnapshot = await db.collection("users").doc(userData.email).get();
    const productsCopy = userSnapshot.data().products;
    const filteredProducts = productsCopy.filter(
      (product) => product.productId !== productId
    );
    //update firestore with new products array
    await firestoreUser
      .update({
        products: filteredProducts,
      })
      .then(refreshUserData);
  };

  return (
    <div className={styles.component_container}>
      <h1 className={styles.title}> Mínar vörur </h1>

      {userData.products.map((product) => {
        return (
          <div key={product.productId} className={styles.product}>
            <img className={styles.product_img} src={product.productImg} />
            <div className={styles.product_info}>
              <h2> {product.productName}</h2>
              <p> {product.productPrice} KR</p>
              <p> ID: {product.productId}</p>
            </div>
            <button className={styles.product_button}>Breyta</button>

            <a
              onClick={() => {
                const productId = product.productId;
                const r = confirm(
                  "Ertu viss um að þú viljir eyða þessari vöru?"
                );
                if (r == true) {
                  handleDelete(productId);
                } else {
                  return;
                }
              }}
            >
              {" "}
              <RiDeleteBin6Line /> Eyða
            </a>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
