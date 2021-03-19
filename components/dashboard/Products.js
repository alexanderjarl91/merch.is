import styles from "../../styles/Dashboard/Products.module.css";
import { db } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import Link from "next/link";

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
      <p className={styles.title}> Mínar vörur </p>

      <div className={styles.header_box}>
        <p>Mynd</p>

        <p>Vöruheiti</p>
        <p>Verð</p>
        <p>Vörunúmer</p>
      </div>

      {userData.products.map((product) => {
        return (
          <div key={product.productId} className={styles.product}>
            <div className={styles.each_product}>
              <div className={styles.grid_item}>
                <img className={styles.product_img} src={product.productImg} />
              </div>

              <div className={styles.product_name}>
                <p> {product.productName}</p>
              </div>

              <div className={styles.product_price}>
                <p> {product.productPrice} KR</p>
              </div>

              <div className={styles.product_id}>
                <p> ID: {product.productId}</p>
              </div>

              <button className={styles.product_button_edit}>Breyta</button>

              <button
                className={styles.product_button_delete}
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
                <AiTwotoneDelete className={styles.product_button_delete} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
