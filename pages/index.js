import React, { useContext, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { UsersContext } from "./context";
import { auth } from "./fire";

import { useRouter } from "next/router";

export default function Home() {
  const { currentUser } = useContext(UsersContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("from index:", auth.currentUser);
  //     router.push("/your-store/dashboard");
  //   } else {
  //     router.push("/landing");
  //   }
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>merch.is</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>LOADING...</h1>
      </main>
    </div>
  );
}
