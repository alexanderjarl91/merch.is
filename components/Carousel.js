import React from "react";
import styles from "../styles/Carousel.module.css";
import Link from "next/link";

export default function Carousel() {
  return (
    <div>
      <div className={styles.content}>
        <div className={styles.frontpageGrid}>
          <p className={styles.front_headline}>SELDU</p>
          <p className={styles.front_headline_nr2}> ÞÍNAR VÖRUR </p>
          <p className={styles.front_description}>
            Byrjaðu að selja vörurnar þínar strax í dag!
          </p>

          <Link href="/signup">
            <button className={styles.nyskraBtn}>Nýskrá</button>
          </Link>

          <p className={styles.login_p}>
            eða{" "}
            <strong>
              <Link href="/login">
                <a className={styles.login_button}>skráðu þig</a>
              </Link>
            </strong>{" "}
            {""}
            inn með þínum aðgangi
          </p>
        </div>
      </div>
    </div>
  );
}
