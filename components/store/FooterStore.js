import React from "react";
import styles from "../../styles/Store/FooterStore.module.css";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function FooterStore() {
  return (
    <div className={styles.store_footer}>
      <div className="content">
        <Link href="/"> þessi síða er smíðuð með © merch.is 2021</Link>
      </div>
    </div>
  );
}
