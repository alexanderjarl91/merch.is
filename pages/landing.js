import React, { useState, useContext } from "react";
import Head from "next/head";
import styles from "../styles/landing.module.css";
import Image from "next/image";

//components
import Carousel from "../components/Carousel";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//firebase
import fire from "./fire";

//context
import { UsersContext } from "./context";

export default function Landing() {
  const { user } = useContext(UsersContext);

  const [showSignUp, setShowSignup] = useState(false);

  // function that toggles from carousel to signup
  const toggleSignUp = () => {
    setShowSignup(!showSignUp);
  };
  return (
    <div>
      <Head>
        <title>merch.is</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mobileBgImg}>
        <Image src="/white.png" layout="fill" objectFit="cover" quality={100} />
      </div>
      <Navbar />
      {showSignUp ? (
        <Login toggleSignUp={toggleSignUp} />
      ) : (
        <Carousel toggleSignUp={toggleSignUp} />
      )}
      <Footer />
    </div>
  );
}
