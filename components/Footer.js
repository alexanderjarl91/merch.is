import React, { useContext } from "react";
import styles from "../styles/Footer.module.css";
import { UsersContext } from "../pages/context";
import { auth, db } from "../pages/fire";

export default function Footer() {
  const {
    currentUser,
    userData,
    users,
    getUsers,
    handleLogin,
    handleLogout,
  } = useContext(UsersContext);

  return (
    <div className={styles.mobileFrontPage}>
      <div className={styles.container}>
        <p>copyright merch.is 2021</p>
        <button
          onClick={() => {
            getUsers();
          }}
        >
          userData
        </button>
        <button
          onClick={() => {
            console.log(users);
          }}
        >
          users
        </button>

        <button
          onClick={() => {
            console.log(auth.currentUser);
          }}
        >
          log user
        </button>
        <button
          onClick={() => {
            handleLogin();
          }}
        >
          login
        </button>
        <button
          onClick={() => {
            handleLogout();
          }}
        >
          log out
        </button>
      </div>
    </div>
  );
}
