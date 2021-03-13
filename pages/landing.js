import React, { useState, useContext } from "react";
import Head from "next/head";

//components
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Login from "../components/Login";

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

      <Navbar />
      <button
        onClick={() => {
          console.log(fire);
        }}
      >
        console log
      </button>

      {showSignUp ? (
        <Login toggleSignUp={toggleSignUp} />
      ) : (
        <Carousel toggleSignUp={toggleSignUp} />
      )}

      <Footer />
    </div>
  );
}
