import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/page404.module.css";

export default function Custom404() {
  return (
    <>
      <div className="content">
        <Navbar />
        <div className={"page404"}></div>

        <div className={styles.error404}>404 </div>
        <div className={styles.errorText}>Úps síðan fannst ekki</div>
      </div>
      <Footer />
    </>
  );
}
