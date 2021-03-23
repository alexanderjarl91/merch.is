import styles from "../../styles/Dashboard/Orders.module.css";
import React, { useContext } from "react";
import { UsersContext } from "../../context";

export default function Orders() {
  const { users, currentUser } = useContext(UsersContext);
  return (
    <div className={styles.component_container}>
      <p className={styles.title}>Pantanir</p>
      <p>under construction..</p>
      <button
        onClick={() => {
          console.log(currentUser.uid);
        }}
      >
        currentUser ID
      </button>

      <button
        onClick={() => {
          console.log(users);
        }}
      >
        users
      </button>

      <button
        onClick={() => {
          console.log(users.name);
        }}
      >
        users name
      </button>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
