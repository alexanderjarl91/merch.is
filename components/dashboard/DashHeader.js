import Link from "next/link";
import styles from "../../styles/Dashboard/DashboardHeader.module.css";
import { auth, db } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext } from "react";

export default function DashHeader() {
  const { handleLogout } = useContext(UsersContext);
  const { userData } = useContext(UsersContext);

  return (
    <div className={styles.dashboardHeader}>
      <Link href="/">
        <p className={styles.logo}> merch. </p>
      </Link>

      <p className={styles.userName}> display name</p>
      <p className={styles.userName}>|</p>
      <a
        onClick={() => {
          handleLogout();
        }}
        className={styles.log_out}
      >
        Útskrá
      </a>
    </div>
  );
}
