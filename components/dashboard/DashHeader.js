import Link from "next/link";
import styles from "../../styles/DashboardHeader.module.css";
import { auth } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext } from "react";

export default function DashHeader() {
  const { handleLogout } = useContext(UsersContext);

  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.logo}>merch</div>
      <p className={styles.marginRight30}>display name</p>
      <p className={styles.marginRight30}>|</p>
      <button
        onClick={() => {
          handleLogout();
        }}
        className={styles.marginRight30}
      >
        Útskrá
      </button>
    </div>
  );
}
