import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/Link";
import Head from "next/head";
import styles from "../styles/Signup.module.css";

//components
import { auth } from "./fire";
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
    storeName,
    url,
    social,
    signUpError,
    setSignUpError,
    setName,
    setEmail,
    setPassword,
    setStoreName,
    setSocial,
    setUrl,
    handleSignup,
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
                <h2>Nýskráning</h2>
              </div>
              <p>Notenda upplýsingar</p>
              <form>
                <div>
                  <label className={styles.label}>Nafn </label>
                  <input
                    className={styles.input}
                    type="text"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
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
                    }}
                  />
                </div>
                <div>
                  <p>Búðin þín</p>
                  <div>
                    <div>
                      <label className={styles.label}>Heiti</label>
                      <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => {
                          setStoreName(e.target.value);
                          console.log(storeName);
                        }}
                      />
                    </div>
                    <div>
                      <label className={styles.label}>Social</label>
                      <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => {
                          setSocial(e.target.value);
                          console.log(social);
                        }}
                      />
                    </div>
                    <div>
                      <label className={styles.label}>Þinn hlekkur:</label>
                      <div className={styles.url_container}>
                        <label>www.merch.is/</label>
                        <input
                          className={styles.input}
                          type="text"
                          onChange={(e) => {
                            setUrl(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {signUpError ? (
                  <p style={{ color: "red" }}>{signUpError}</p>
                ) : null}

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
                    eða
                    <a>
                      <Link href="/login">
                        <strong>skráðu þig inn </strong>
                      </Link>
                    </a>
                    ef þú átt reikning
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* <Footer /> */}
    </div>
  );
}
