import styles from "../../styles/Dashboard/Store.module.css";
import { UsersContext } from "../../pages/context";
import React, { useState, useContext } from "react";
import { db } from "../../pages/fire";

export default function Store() {
  const {
    userData,
    users,
    currentUser,
    refreshUserData,
    getUserData,
  } = useContext(UsersContext);

  const [edit, setEdit] = useState(false);

  const [bio, setBio] = useState(userData.store.bio);
  const [name, setName] = useState(userData.store.name);
  const [logo, setLogo] = useState(userData.store.logo);
  const [url, setUrl] = useState(userData.store.url);

  const updateStore = async () => {
    const store = {
      name: name,
      logo: logo,
      url: url,
      bio: bio,
    };

    const user = await db.collection("users").doc(userData.email).get();
    const userStore = user.data().store;

    db.collection("users").doc(userData.email).update({ store: store });
    refreshUserData();
    setEdit(false);
  };

  return (
    <div className={styles.component_container}>
      {edit ? (
        <>
          <div>
            <label>Búðarnafn</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className={styles.input}
              type="text"
              placeholder={userData.store.name}
            ></input>
          </div>
          <div>
            <label>Hlekkur á mynd</label>
            <input
              onChange={(e) => {
                setLogo(e.target.value);
              }}
              className={styles.input}
              type="text"
              placeholder={userData.store.logo}
            ></input>
          </div>
          <div>
            <label>Instagram</label>
            <input
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              className={styles.input}
              type="text"
              placeholder={userData.store.logo}
            ></input>
          </div>
          <div>
            <label>Um búðina</label>
            <textarea
              onChange={(e) => {
                setBio(e.target.value);
              }}
              rows="5"
              className={styles.input}
              type="text"
              placeholder={userData.store.bio}
            ></textarea>
          </div>
          <div>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              hætta við
            </button>
            <button
              onClick={() => {
                updateStore();
              }}
            >
              vista
            </button>
          </div>
        </>
      ) : (
        <>
          <img src={userData.store.logo} />
          <h1>{userData.store.name}</h1>
          <p>{userData.store.url}</p>
          <p>{userData.store.bio}</p>

          <a
            onClick={() => {
              setEdit(true);
            }}
          >
            Breyta
          </a>
        </>
      )}

      <h4>Þinn hlekkur:</h4>
      <p>www.merch.is/{userData.store.url}</p>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
