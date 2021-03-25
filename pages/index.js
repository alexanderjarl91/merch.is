import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Index.module.css";

//components
import Carousel from "../components/Carousel";
import { auth } from "../fire";
import { UsersContext } from "../context";
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

      {auth.currentUser ? null : (
        <>
          <div className={styles.mobile_bg_img}>
            <div className="content">
              <Navbar />
              <div className={styles.container}>
                <Carousel />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
