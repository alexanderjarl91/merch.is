import React, { useState } from "react";

import Head from "next/head";

//components
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Login from "../components/Login";

export default function Landing() {
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

      {showSignUp ? (
        <Login toggleSignUp={toggleSignUp} />
      ) : (
        <Carousel toggleSignUp={toggleSignUp} />
      )}

      <Footer />
    </div>
  );
}
