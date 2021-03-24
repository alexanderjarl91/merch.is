import React, { useState, useContext } from "react";
import Link from "next/link";
import styles from "../../styles/Dashboard/Sidemenu.module.css";
import {
  MdDashboard,
  MdAddBox,
  MdShoppingCart,
  MdFormatLineSpacing,
} from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { CgMenuRight } from "react-icons/cg";
import { UsersContext } from "../../context";

export default function Sidemenu({ componentShowing, setComponentShowing }) {
  const { userData, handleLogout } = useContext(UsersContext);

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
    <>
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
        <p className={styles.logo_mobile}>merch.</p>
        <div className={styles.sideMenu}>
          <ul className={`burgerNavDash ${navbarOpen ? " showMenu" : ""}`}>
            <li>
              <button
                autoFocus
                className={styles.sideMenu_buttons}
                onClick={() => {
                  setComponentShowing("dashboard");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <MdDashboard className={styles.sideMenu_icon} /> Yfirlit{" "}
              </button>
            </li>
            <li>
              <button
                className={styles.sideMenu_buttons}
                onClick={() => {
                  setComponentShowing("store");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <IoMdSettings className={styles.sideMenu_icon} /> Stillingar
              </button>
            </li>
            <li>
              <button
                className={styles.sideMenu_buttons}
                onClick={() => {
                  setComponentShowing("products");
                  closeMenu();
                }}
              >
                <MdFormatLineSpacing className={styles.sideMenu_icon} /> Mínar
                vörur{" "}
              </button>
            </li>
            <li>
              <button
                className={styles.sideMenu_buttons}
                onClick={() => {
                  setComponentShowing("add");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <MdAddBox className={styles.sideMenu_icon} /> Bæta við vöru{" "}
              </button>
            </li>
            <li className={styles.button}>
              <button
                className={styles.sideMenu_buttons}
                onClick={() => {
                  setComponentShowing("orders");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <MdShoppingCart className={styles.sideMenu_icon} /> Pantanir{" "}
              </button>
            </li>

            <div className={styles.sideMenu_extra_links_container}>
              <li className={styles.sideMenu_extra_links}>
                {userData && userData.store ? (
                  <a href={`/${userData.store.url}`}>Búðin mín</a>
                ) : null}
              </li>
              <li className={styles.sideMenu_extra_links}>
                <Link href="/hafa_samband">Hafa samband</Link>
              </li>
              <li className={styles.sideMenu_extra_links}>
                <Link href="/um_okkur">Um okkur</Link>
              </li>
              <li>
                <button
                  className={styles.sideMenu_utskra}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Útskrá
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
       
    </>
  );
}
