import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Login.module.css";
import { UsersContext } from "../pages/context";

export default function Login({ toggleSignUp }) {
  const router = useRouter();

  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    handleSignup,
    handleLogin,
    handleLogout,
  } = useContext(UsersContext);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  //function that toggles between signup and login
  const toggleLogIn = () => {
    setIsLoggingIn(!isLoggingIn);
  };
  return (
    <div className={styles.login}>
      {isLoggingIn ? (
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <h1>Innskráning</h1>
            <button
              onClick={() => {
                toggleSignUp();
              }}
            >
              X
            </button>
          </div>
          <form>
            <div>
              <label>Netfang</label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(email);
                }}
              />
            </div>
            <div>
              <label>Lykilorð</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password);
                }}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email, password);
                router.push("/store/dashboard");
              }}
            >
              Skrá inn
            </button>
            <p>
              eða{" "}
              <button
                onClick={() => {
                  toggleLogIn();
                }}
              >
                nýskráðu þig
              </button>{" "}
              ef þú átt ekki reikning
            </p>
          </form>
        </div>
      ) : (
        //   SIGN UP FORM
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <h1>Skráning</h1>
            <button
              onClick={() => {
                toggleSignUp();
              }}
            >
              X
            </button>
          </div>
          <form>
            <div>
              <label>Nafn</label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                  console.log(name);
                }}
              />
            </div>
            <div>
              <label>Netfang</label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(email);
                }}
              />
            </div>
            <div>
              <label>Lykilorð</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password);
                }}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              Nýskrá
            </button>
            <p>
              eða{" "}
              <button
                onClick={() => {
                  toggleLogIn();
                }}
              >
                skráðu þig inn
              </button>{" "}
              ef þú átt reikning
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
