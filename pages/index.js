import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/landing.module.css";
import Image from "next/image";

//components
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../components/Login";
import { auth, db } from "./fire";
import { UsersContext } from "./context";
import Layout from "../components/Layout";

export default function Landing() {
  const router = useRouter();
  const {
    currentUser,
    getUsers,
    handleLogin,
    handleLogout,
    setCurrentUser,
  } = useContext(UsersContext);
  const [showSignUp, setShowSignup] = useState(false);

  // whenever authstate changes, if the user is logged in, redirect to dashboard
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        router.push("/store/dashboard");
        console.log("authstate is pushing to dashboard");
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      router.push("/store/dashboard");
    }
  }, [currentUser]);

  // function that toggles from carousel to signup
  const toggleSignUp = () => {
    setShowSignup(!showSignUp);
  };

  return (
    <div>
      <Head>
        <title>merch.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {auth.currentUser ? (
          <p>loading..</p>
        ) : (
          <>
            <div className={styles.mobileBgImg}>
              {/* <Image
              src="/white.png"
              layout="fill"
              objectFit="cover"
              quality={100}
            /> */}
            </div>

            {showSignUp ? (
              <Login toggleSignUp={toggleSignUp} />
            ) : (
              <Carousel toggleSignUp={toggleSignUp} />
            )}
          </>
        )}
      </Layout>
    </div>
  );
}
