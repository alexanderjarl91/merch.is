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
    console.log("menu toggled");
  };
  // this is triggered when a Link is clicked, so the menu will close after the click
  const closeMenu = () => {
    console.log("navbar closed");
    setNavbarOpen(false);
  };

  return (
    <div className={styles.deskNav}>
      <div className="content">
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">merch.</Link>
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
                  href={{
                    pathname: "/",
                  }}
                >
                  <a
                    onClick={() => {
                      closeMenu();
                    }}
                  >
                    Hvernig virkar þetta?
                  </a>
                </Link>
              </li>
              <li className={styles.nav_link}>
                <Link
                  href={{
                    pathname: "/um_okkur",
                  }}
                >
                  <a
                    onClick={() => {
                      closeMenu();
                    }}
                  >
                    Um okkur
                  </a>
                </Link>
              </li>
              <li className={styles.nav_link}>
                <Link
                  href={{
                    pathname: "/hafa_samband",
                  }}
                >
                  <a
                    onClick={() => {
                      closeMenu();
                    }}
                  >
                    Hafa samband
                  </a>
                </Link>
              </li>
              <li className={styles.nav_link}>
                <Link href="/login" activeClassName="active-link" exact>
                  <button onClick={() => closeMenu()}>Innskrá</button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
