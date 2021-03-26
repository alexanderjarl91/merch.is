import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Signup.module.css";
import Footer from "../components/Footer";
//components
import { auth } from "../fire";
import { UsersContext } from "../context";
import Navbar from "../components/Navbar";

export default function Landing() {
  const router = useRouter();

  const {
    userData,
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
    checkUrlAvailability,
  } = useContext(UsersContext);

  useEffect(() => {
    if (auth.currentUser && userData) {
      console.log(userData);
      router.push("/store/dashboard");
    }
  }, [userData]);

  return (
    <>
      <Head>
        <title>Nýskráning | merch.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {currentUser ? null : (
        <div>
          <Head>
            <title>merch.</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {auth.currentUser ? (
            <p>loading..</p>
          ) : (
            <>
              <div className={styles.bg_img}>
                <div className="content">
                  <Navbar />
                  {/* SIGN UP FORM */}
                  <div className={styles.signup__container}>
                    <button
                      onClick={() => router.back()}
                      className={styles.go_back_button}
                    >
                      X
                    </button>
                    <div>
                      <p className={styles.signup__header}>Nýskráning</p>
                      <p className={styles.signup__header_2}>
                        Stofnaðu þinn aðgang og komdu vörunum þínum á markaðinn
                        á núll einni.
                      </p>
                    </div>

                    <form className={styles.form}>
                      <div className={styles.left_side}>
                        <p className={styles.user_info}>Notenda upplýsingar</p>
                        <div>
                          <label className={styles.label}>Nafn*</label>
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
                          <label className={styles.label}>Netfang*</label>
                          <input
                            className={styles.input}
                            type="email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <label className={styles.label}>Lykilorð*</label>
                          <input
                            className={styles.input}
                            type="password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.right_side}>
                        <p className={styles.store_info}>Búðin þín</p>
                        <div>
                          <div>
                            <label className={styles.label}>Heiti*</label>
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
                            <label className={styles.label}>
                              Samfélagsmiðillinn þinn
                            </label>
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
                            <label className={styles.label}>
                              Þinn hlekkur:*
                            </label>
                            <div className={styles.url_container}>
                              <label>www.merch.is/</label>
                              <input
                                className={styles.input}
                                type="text"
                                onChange={(e) => {
                                  setUrl(e.target.value);
                                  checkUrlAvailability();
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {signUpError ? (
                      <p
                        style={{
                          color: "red",
                          background: "#F4F5F5",
                          textAlign: "center",
                        }}
                      >
                        {signUpError}
                      </p>
                    ) : null}

                    <div>
                      <button
                        className={styles.login__btn}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSignup();
                        }}
                      >
                        Nýskrá
                      </button>
                      <p className={styles.login_paragraph}>
                        eða{" "}
                        <a>
                          <Link href="/login">
                            <strong>skráðu þig inn </strong>
                          </Link>
                        </a>
                        ef þú átt reikning
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
