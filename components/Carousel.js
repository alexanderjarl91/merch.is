import React, { useState } from "react";
import styles from "../styles/Carousel.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Carousel({ toggleSignUp }) {
  return (
    <>
      <div>
        <div className={styles.frontpageGrid}>
          {/* Image grid for desktop ladning frontpage */}
          <div className={styles.frontpage_img}>
            <Image src="/frontpage_img.png" width={375} height={460}></Image>
          </div>
          <div className={styles.headlineGrid}>
            <p className={styles.front_headline}>SELDU ÞÍNAR VÖRUR</p>
          </div>

          <div className={styles.descriptionGrid}>
            <p className={styles.front_description}>
              Byrjaðu að selja vörurnar þínar strax í dag!
            </p>
          </div>

          <div className={styles.nyskraGrid}>
            <button
              className={styles.nyskraBtn}
              onClick={() => {
                toggleSignUp();
              }}
            >
              Nýskrá
            </button>
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
      {/* </div> */}
    </>
  );
}
