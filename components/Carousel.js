import React, { useState } from "react";
import styles from "../styles/Carousel.module.css";

export default function Carousel({toggleSignUp}) {

  return (
    <div className={styles.container}>
      <div>
        <h1>SELDU ÞÍNAR VÖRUR</h1>
        <h2>AUÐVELDLEGA</h2>
        <h4>Byrjaðu að selja þínar vörur strax í dag!</h4>
        <button>lesa meira</button>
      </div>
      <button onClick={() => {
        toggleSignUp()
      }}>Skráðu þig núna</button>
    </div>)}
