import styles from "../../styles/Dashboard.module.css";
import { auth } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext } from "react";

export default function Add() {
  const { userData, users, currentUser } = useContext(UsersContext);
  return (
    <div className={styles.component_container}>
      <h1> Bæta við vöru</h1>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
