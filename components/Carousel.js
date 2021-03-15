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
            <p className={styles.seldu}>SELDU </p>{" "}
            <p className={styles.vörur}> ÞÍNAR VÖRUR</p>
          </div>

          <div className={styles.descriptionGrid}>
            <p className={styles.byrjaðu}>
              Byrjaðu að selja vörurnar þínar strax í dag!
            </p>
            <button className={styles.lesaMeira}>lesa meira</button>
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
            <p className={styles.skraInnP}>
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
      <div className={styles.mobileBgImg}>
        {/* <Image
          src="/mobile-bg.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        /> */}
      </div>
    </>
  );
}
