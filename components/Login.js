import React, { useState } from "react";
import styles from "../styles/Login.module.css";

export default function Login({ toggleSignUp }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  //function that toggles between signup and login
  const toggleLogIn = () => {
    setIsLoggingIn(!isLoggingIn);
  };
  return (
    <div className={styles.login}>
      {isLoggingIn ? (
        <div className={styles.login__container}>
          <button
            className={styles.login__close_btn}
            onClick={() => {
              toggleSignUp();
            }}
          >
            X
          </button>
          <div className={styles.login__header}>
            <p>Innskráning</p>
          </div>
          <form>
            <div>
              <label className={styles.login__label}>Netfang</label>
              <input className={styles.login__input} type="email" />
            </div>
            <div>
              <label className={styles.login__label}>Lykilorð</label>
              <input className={styles.login__input} type="password" />
            </div>
            <button className={styles.login__btn}>SKRÁ</button>
            <p>
              eða{" "}
              <button
                className={styles.login__text_btn}
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
          <button
            className={styles.login__close_btn}
            onClick={() => {
              toggleSignUp();
            }}
          >
            X
          </button>
          <div className={styles.login__header}>
            <p>Skráning</p>
          </div>
          <form>
            <div>
              <label className={styles.login__label}>Nafn</label>
              <input className={styles.login__input} type="text" />
            </div>
            <div>
              <label className={styles.login__label}>Netfang</label>
              <input className={styles.login__input} type="email" />
            </div>
            <div>
              <label className={styles.login__label}>Lykilorð</label>
              <input className={styles.login__input} type="password" />
            </div>
            <button className={styles.login__btn}>SKRÁ</button>
            <p>
              eða{" "}
              <button
                className={styles.login__text_btn}
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
