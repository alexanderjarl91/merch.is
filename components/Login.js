import React, { useState } from "react";
import styles from "../styles/Login.module.css";

export default function Login({ toggleSignUp }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  //function that toggles between signup and login
  const toggleLogIn = () => {
    setIsLoggingIn(!isLoggingIn);
  };
  return (
    <div className={styles.login}>
      {isLoggingIn ? 
        <div className={styles.login__container}>
            <div className={styles.login__header}>
                <h1>Innskráning</h1>
                <button onClick={()=>{toggleSignUp()}}>X</button>
            </div>
            <form>
                <div>
                    <label>Netfang</label>
                    <input type="email"/>
                </div>
                <div>
                    <label>Lykilorð</label>
                    <input type="password"/>
                </div>
                <button>submit</button>
                <p>eða <button onClick={()=>{
                    toggleLogIn()
                }}>nýskráðu þig</button> ef þú átt ekki reikning</p>
            </form></div> 
      
    //   SIGN UP FORM
      : <div className={styles.login__container}>
            <div className={styles.login__header}>
                <h1>Skráning</h1>
                <button onClick={()=>{
                    toggleSignUp()
                }}>X</button>
            </div>
            <form>
                <div>
                    <label>Nafn</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Netfang</label>
                    <input type="email"/>
                </div>
                <div>
                    <label>Lykilorð</label>
                    <input type="password"/>
                </div>
                <button>submit</button>
                <p>eða <button onClick={()=>{
                    toggleLogIn()
                }}>skráðu þig inn</button> ef þú átt reikning</p>
            </form>
      </div>}
    </div>
  );
}
