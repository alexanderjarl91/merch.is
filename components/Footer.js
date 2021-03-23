import React from "react";
import styles from "../styles/Footer.module.css";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className="content">
        <a href="www.instagram.com">
          <IoLogoInstagram className={styles.social} />{" "}
        </a>
        {/* <a href="www.facebook.com">
          <FaFacebook className={styles.social} />
        </a> */}
        <p className={styles.skilmalar}>Skilmálar</p>
        <Link href="/">copyright merch.is 2021</Link>
      </div>
    </div>
  );
}
