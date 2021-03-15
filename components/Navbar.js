import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { MdClose } from "react-icons/md";
import { CgMenuRight } from "react-icons/cg";

export default function Navbar() {
  // state for the hamburger menu on mobile view
  const [navbarOpen, setNavbarOpen] = useState(false);

  // updating the state using the updater function - showing burger icon or the closing icon
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  // this is triggered when a Link is clicked, so the menu will close after the click
  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/landing">merch.</Link>
        </div>

        <div className={styles.burger}>
          {/* hamburger menu */}

          <button className={styles.burger_button} onClick={handleToggle}>
            {/* If the navbar is open then show the closing icon, else show the burger icon */}
            {navbarOpen ? (
              <MdClose className={styles.burger_icon_close} />
            ) : (
              <CgMenuRight className={styles.burger_icon} />
            )}
          </button>

          {/* className "showMenu" is active only if "navbarOpen" is true. When it is false, we remove the class. */}
          {/* The styling for this is in the global.css file */}
          <ul className={`burgerNav ${navbarOpen ? " showMenu" : ""}`}>
            <li className={styles.nav_link}>
              <Link
                href="/"
                activeClassName="active-link"
                onClick={() => closeMenu()}
                exact
              >
                Hvernig þetta virkar
              </Link>
            </li>
            <li className={styles.nav_link}>
              <Link
                href="/um_okkur"
                activeClassName="active-link"
                onClick={() => closeMenu()}
                exact
              >
                Um okkur
              </Link>
            </li>
            <li className={styles.nav_link}>
              <Link
                href="/hafa_samband"
                activeClassName="active-link"
                onClick={() => closeMenu()}
                exact
              >
                Hafa samband
              </Link>
            </li>
            <li className={styles.nav_link}>
              <Link
                href="/"
                activeClassName="active-link"
                onClick={() => closeMenu()}
                exact
              >
                Innskrá
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
