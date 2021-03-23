import React from "react";
import styles from "../styles/Hafa_samabnd.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function hafa_samband(props) {
  return (
    <>
      <div className="content">
        <Navbar />
        <div className={styles.container}>
          <p className={styles.hafa_samaband_h1}>
            Hafðu samband, við elskum að fá ný skilaboð
          </p>
          <form className={styles.contact_form} action="/" method="POST">
            <label className={styles.contact_label}>Nafn</label>
            <input
              className={styles.contact_input}
              type="text"
              required
            ></input>

            <label className={styles.contact_label}>Netfang</label>
            <input
              className={styles.contact_input}
              type="email"
              required
            ></input>

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
      </div>
      <Footer />
    </>
  );
}

export default hafa_samband;
