import React, { useState } from "react";
import styles from "../styles/Carousel.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Carousel() {
  return (
    <div>
      <div className={styles.frontpageGrid}>
        <div className={styles.content}>
          <div className={styles.headlineGrid}>
            <p className={styles.front_headline}>SELDU ÞÍNAR VÖRUR</p>
          </div>

          <div className={styles.descriptionGrid}>
            <p className={styles.front_description}>
              Byrjaðu að selja vörurnar þínar strax í dag!
            </p>
          </div>

          <div className={styles.nyskraGrid}>
            <Link href="/signup">
              <button className={styles.nyskraBtn}>Nýskrá</button>
            </Link>
            <p className="login_paragraph">
              eða{" "}
              <strong>
                <Link href="/">
                  <a>skráðu þig</a>
                </Link>
              </strong>{" "}
              {""}
              inn með þínum aðgangi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
