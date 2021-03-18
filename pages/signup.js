import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Signup.module.css";

//components
import { auth, db } from "./fire";
import { UsersContext } from "./context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing() {
  const router = useRouter();

  const {
    currentUser,
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

  useEffect(() => {
    if (currentUser) {
      router.push("/store/dashboard");
    }
  }, [currentUser]);

  return (
    <div>
      <Head>
        <title>merch.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {auth.currentUser ? (
        <p>loading..</p>
      ) : (
        <>
          <div className={styles.mobile_bg_img}>
            <Navbar />
            {/* SIGN UP FORM */}
            <div className={styles.login__container}>
              <div className={styles.login__header}>
                <h1>Nýskráning</h1>
              </div>
              <form>
                <div>
                  <label className={styles.label}>Nafn</label>
                  <input
                    className={styles.input}
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                      console.log(name);
                    }}
                  />
                </div>
                <div>
                  <label className={styles.label}>Netfang</label>
                  <input
                    className={styles.input}
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      console.log(email);
                    }}
                  />
                </div>
                <div>
                  <label className={styles.label}>Lykilorð</label>
                  <input
                    className={styles.input}
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      console.log(password);
                    }}
                  />
                </div>
                <div className={styles.login__btn}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignup();
                    }}
                  >
                    Nýskrá
                  </a>
                  <p className={styles.login_paragraph}>
                    eða{" "}
                    <a onClick={() => {}}>
                      {" "}
                      <strong>skráðu þig inn </strong>
                    </a>{" "}
                    ef þú átt reikning
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
