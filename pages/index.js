import React, { useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { UsersProvider, UsersContext } from "./context";

export default function Home() {
  const { users } = useContext(UsersContext);
  console.log(users);

  return (
    <div className={styles.container}>
      <Head>
        <title>merch.is</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>MERCH.IS</h1>
        <button
          onClick={() => {
            console.log(users);
          }}
        >
          hello
        </button>
      </main>
    </div>
  );
}
