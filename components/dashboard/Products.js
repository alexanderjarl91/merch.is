import styles from "../../styles/Dashboard/Products.module.css";
import { auth, db } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Products() {
  const { userData, users, currentUser } = useContext(UsersContext);

  // const handleDelete = async() => {
  //   console.log(db);

  //   const userSnapshot =
  // };

  return (
    <div className={styles.component_container}>
      <h1> Mínar vörur </h1>

      {userData.products.map((product) => {
        return (
          <div className={styles.product}>
            <img className={styles.product_img} src={product.productImg} />
            <div className={styles.product_info}>
              <h2> {product.productDescription}</h2>
              <p> {product.productPrice} KR</p>
              <p> ID: {product.productId}</p>
            </div>
            <button className={styles.product_button}>Breyta</button>

            <a
              onClick={() => {
                handleDelete();
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
