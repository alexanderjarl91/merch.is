import styles from "../../styles/Dashboard/Orders.module.css";
import { auth } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext } from "react";

export default function Edit() {
  const { userData, users, currentUser } = useContext(UsersContext);
  return (
    <div className={styles.component_container}>
      <p className={styles.title}>Breyta</p>
      <p>under construction..</p>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
