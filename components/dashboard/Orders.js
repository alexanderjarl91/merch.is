import styles from "../../styles/Dashboard/Orders.module.css";
import { auth } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext } from "react";

export default function Orders() {
  const { userData, users, currentUser } = useContext(UsersContext);
  return (
    <div className={styles.component_container}>
      <p className={styles.title}>Pantanir</p>
      <p>under construction..</p>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
