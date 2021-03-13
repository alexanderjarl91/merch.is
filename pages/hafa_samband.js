import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Hafa_samabnd.module.css";

function hafa_samband(props) {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <p className={styles.hafa_samaband_h1}>
          Hafðu samband, við elskum að fá ný skilaboð
        </p>
        <form className={styles.contact_form} action="/" method="POST">
          <label className={styles.contact_label} for="name">
            Nafn
          </label>
          <input className={styles.contact_input} type="text" required></input>

          <label className={styles.contact_label} for="email">
            Netfang
          </label>
          <input className={styles.contact_input} type="text" required></input>

          <label className={styles.contact_label}>Skilaboð</label>
          <textarea
            rows="4"
            className={styles.contact_textarea}
            required
          ></textarea>

          <button className={styles.contact_btn} type="submit">
            SENDA
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default hafa_samband;
