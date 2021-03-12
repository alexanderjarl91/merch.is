import React from "react";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      {/* logo */}
      <h2>merch.</h2>

      {/* hamburger menu */}
      <div className={styles.hamburger}>
        <span className={styles.hamburger__line}/>
        <span className={styles.hamburger__line2}/>
        <span className={styles.hamburger__line2}/>
      </div>

    </div>
  );
}
