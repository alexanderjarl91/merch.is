import React, { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { auth } from "../fire";
import { UsersContext } from "../context";

//components
import Navbar from "../components/Navbar";

export default function Landing() {
  const router = useRouter();

  const {
    email,
    password,
    loginError,
    setEmail,
    setPassword,
    handleLogin,
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
          <div className={styles.bg_img}>
            <div className="content">
              <Navbar />
              {/* LOGIN FORM */}
              <div className={styles.login__container}>
                <button
                  onClick={() => router.back()}
                  className={styles.go_back_button}
                >
                  X
                </button>
                <div>
                  <p className={styles.login__header}>Skráðu þig inn</p>
                  <p className={styles.login__header_2}>
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
                        <span style={{ cursor: "pointer" }}>
                          <strong>nýskráðu þig</strong>
                        </span>
                      </Link>{" "}
                      ef þú átt ekki reikning
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
