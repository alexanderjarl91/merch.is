import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import Link from "next/Link";

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
    loginError,
    setName,
    setEmail,
    setPassword,
    handleSignup,
    handleLogin,
    handleLogout,
  } = useContext(UsersContext);

  //if user is logged in push to dashboard

  if (auth.currentUser) {
    router.push("/store/dashboard");
  }

  return (
    <>
      <div>
        <Head>
          <title>merch.</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          <div className={styles.mobile_bg_img}>
            <Navbar />
            {/* LOGIN FORM */}
            <div className={styles.login__container}>
              <div className={styles.login__header}>
                <button
                  onClick={() => router.back()}
                  className={styles.go_back_button}
                >
                  X
                </button>
                <h1 className={styles.login__header}>Skráðu þig inn</h1>
                <p className={styles.login_subtitle}>
                  Skráðu þig inn á þína verslun með netfangi og lykilorði
                </p>
              </div>
              <form>
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
                <div className={styles.login_footer}>
                  <button
                    className={styles.login__btn}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin(email, password);
                    }}
                  >
                    Skrá inn
                  </button>
                  {loginError ? (
                    <p style={{ color: "red", background: "#F4F5F5" }}>
                      {loginError}
                    </p>
                  ) : null}

                  <p className={styles.login_paragraph}>
                    eða{" "}
                    <Link href="/signup">
                      <strong>nýskráðu þig</strong>
                    </Link>{" "}
                    ef þú átt ekki reikning
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
