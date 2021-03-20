import styles from "../../styles/Dashboard/Yfirlit.module.css";
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
      <p className={styles.title}> Yfirlit</p>

      <div className={styles.yfirlit_grid}>
        <div className={styles.yfirlit_grid_box1}>Box 1</div>
        <div className={styles.yfirlit_grid_box2}>Box 2</div>
        <div className={styles.yfirlit_grid_box3}>Box 3</div>
        <div className={styles.yfirlit_grid_box4}>Box 4</div>
      </div>
      <button style={{ color: "black" }} onClick={() => {}}>
        Takki sem gerir ekkert
      </button>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
