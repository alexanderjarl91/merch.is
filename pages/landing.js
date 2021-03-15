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

export default function Landing() {
  const router = useRouter();
  const { currentUser, getUsers, handleLogin, handleLogout } = useContext(
    UsersContext
  );
  const [showSignUp, setShowSignup] = useState(false);

  useEffect(() => {
    if (currentUser) {
      router.push("/your-store/dashboard");
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
      <div className={styles.mobileBgImg}>
        <Image src="/white.png" layout="fill" objectFit="cover" quality={100} />
      </div>
      <Navbar />
      {/* <button
        onClick={() => {
          getUsers();
        }}
      >
        DATA
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
      </button> */}

      {showSignUp ? (
        <Login toggleSignUp={toggleSignUp} />
      ) : (
        <Carousel toggleSignUp={toggleSignUp} />
      )}
      <Footer />
    </div>
  );
}
