import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Index.module.css";

//components
import Carousel from "../components/Carousel";
import { auth, db } from "./fire";
import { UsersContext } from "./context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing() {
  const router = useRouter();
  const { currentUser } = useContext(UsersContext);

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
            <div className="content">
            <Navbar />
            <Carousel />
            </div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
