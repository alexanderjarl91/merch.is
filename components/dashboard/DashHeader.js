import Link from "next/link";
import styles from "../../styles/Dashboard/DashboardHeader.module.css";
import { UsersContext } from "../../context";
import React, { useContext } from "react";

export default function DashHeader() {
  const { handleLogout } = useContext(UsersContext);
  const { userData } = useContext(UsersContext);

  return (
    <div className={styles.dashboardHeader}>
      <Link href="/">
        <p className={styles.logo}>merch.</p>
      </Link>
      <div className={styles.dash_info}>
        {userData ? (
          <>
            <p className={styles.userName}>{userData.name}</p>
            <p className={styles.userName}>|</p>
          </>
        ) : null}
        <a
          onClick={() => {
            handleLogout();
          }}
          className={styles.log_out}
        >
          Útskrá
        </a>
      </div>
    </div>
  );
}
