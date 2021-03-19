import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Sidemenu.module.css";
import {
  MdDashboard,
  MdAddBox,
  MdShoppingCart,
  MdFormatLineSpacing,
} from "react-icons/md";
import { MdClose } from "react-icons/md";
import { CgMenuRight } from "react-icons/cg";
import { UsersContext } from "../../pages/context";

export default function Sidemenu({ componentShowing, setComponentShowing }) {
  const { userData, getUserData } = useContext(UsersContext);

  useEffect(() => {
    getUserData();
  }, []);
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
        <div className={styles.sideMenu}>
          <ul className={`burgerNavDash ${navbarOpen ? " showMenu" : ""}`}>
            <li className={styles.sideMenu_buttons}>
              <a
                onClick={() => {
                  setComponentShowing("dashboard");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <MdDashboard className={styles.sideMenu_icon} /> Yfirlit{" "}
              </a>
            </li>
            <li className={styles.sideMenu_buttons}>
              <a
                onClick={() => {
                  setComponentShowing("store");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <MdShoppingCart className={styles.sideMenu_icon} /> Búðin mín
              </a>
            </li>
            <li className={styles.sideMenu_buttons}>
              <a
                onClick={() => {
                  setComponentShowing("products");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <MdFormatLineSpacing className={styles.sideMenu_icon} /> Mínar
                vörur{" "}
              </a>
            </li>
            <li className={styles.sideMenu_buttons}>
              <a
                onClick={() => {
                  setComponentShowing("add");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <MdAddBox className={styles.sideMenu_icon} /> Bæta við vöru{" "}
              </a>
            </li>
            <li className={styles.sideMenu_buttons}>
              <a
                onClick={() => {
                  setComponentShowing("orders");
                  closeMenu();
                  console.log(componentShowing);
                }}
              >
                <MdShoppingCart className={styles.sideMenu_icon} /> Pantanir{" "}
              </a>
            </li>

            <div className={styles.sideMenu_extra_links_container}>
              <li className={styles.sideMenu_extra_links}>
                <Link href={`/${userData.store.url}`}>
                  <p> Búðin mín </p>
                </Link>
              </li>
              <li className={styles.sideMenu_extra_links}>
                <Link href="/hafa_samband">
                  <p> Hafa samband </p>
                </Link>
              </li>
              <li className={styles.sideMenu_extra_links}>
                <Link href="/um_okkur">
                  <p> Um okkur </p>
                </Link>
              </li>
              <button
                onClick={() => {
                  console.log(userData);
                }}
              ></button>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
