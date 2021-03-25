import React from "react";
import styles from "../styles/Um_okkur.module.css";
import Head from "next/head";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function um_okkur() {
  return (
    <>
      <Head>
        <title>Um okkur | merch.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="content">
        <Navbar />
        <div className={styles.container}>
          <p className={styles.um_okkur_headline}>UM OKKUR</p>
          <p className={styles.aukaP}>Auðveld uppsetning & aðgengilegri sala</p>
          <div className={styles.um_okkur_body_text}>
            <p>
              {" "}
              merch.is er vettvangur fyrir listamenn til að vörur sínar
              aðgengilegar öllum og rukkað á auðveldan hátt.
            </p>
            <br />
            <p>
              tristique fermentum. Lacus tristique fermentum in imperdiet
              convallis nibh eget. Diam felis, felis mi ligula ante eget.
              Bibendum non venenatis amet adipiscing auctor tristique fermentum.
              Lacus tristique fermentum in imperdiet convallis nibh eget. Diam
              felis, felis mi ligula ante eget.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default um_okkur;
