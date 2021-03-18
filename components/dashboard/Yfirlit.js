import styles from "../../styles/Dashboard.module.css";
import { auth } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useEffect, useContext } from "react";

export default function Yfirlit() {
  const {
    userData,
    users,
    currentUser,
    refreshUserData,
    getUserData,
  } = useContext(UsersContext);

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className={styles.component_container}>
      <h1> Yfirlit</h1>
      <a style={{ color: "black" }} onClick={() => {}}>
        asd
      </a>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
