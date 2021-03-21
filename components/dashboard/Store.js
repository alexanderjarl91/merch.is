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
      <p className={styles.title}> Búðin mín </p>
      {edit ? (
        <>
          <div className={styles.store_grid_edit}>
            <div>
              <label className={styles.edit_label}>Búðarnafn</label>
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
              <label className={styles.edit_label}>Hlekkur á mynd</label>
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
              <label className={styles.edit_label}>Instagram</label>
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
              <label className={styles.edit_label}>Um búðina</label>
              <textarea
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                rows="3"
                className={styles.input}
                type="text"
                placeholder={userData.store.bio}
              ></textarea>
            </div>
            <div>
              <button
                className={styles.store_button_cancel}
                onClick={() => {
                  setEdit(false);
                }}
              >
                hætta við
              </button>
              <button
                className={styles.store_button_confirm}
                onClick={() => {
                  updateStore();
                }}
              >
                vista
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.store_grid}>
            <img className={styles.user_logo} src={userData.store.logo} />
            <p className={styles.user_name}>
              {" "}
              <strong> Nafn: </strong>
              {userData.store.name}
            </p>
            <p className={styles.user_url}>
              {" "}
              <strong>Linkurinn á netverlusninni þinni: </strong>
              {userData.store.url}
            </p>
            <p className={styles.user_bio}>
              <strong>Um merkið þitt: </strong>
              {userData.store.bio}
            </p>

            <button
              className={styles.store_button_change}
              onClick={() => {
                setEdit(true);
              }}
            >
              Breyta upplýsingum
            </button>
            <p className={styles.user_hlekkur}>
              {" "}
              <strong>Linkurinn þinn: </strong>
            </p>
            <p className={styles.user_merch_linkur}>
              www.merch.is/{userData.store.url}
            </p>
          </div>
        </>
      )}
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
