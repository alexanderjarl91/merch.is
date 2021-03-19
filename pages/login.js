import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Signup.module.css";
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
                <h1>Skráðu þig inn</h1>
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
                  }}
                >
                  Skrá inn
                </button>
                {loginError ? (
                  <p style={{ color: "red" }}>{loginError}</p>
                ) : null}

                <p>
                  eða <Link href="/signup">nýskráðu þig</Link> ef þú átt ekki
                  reikning
                </p>
              </form>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
