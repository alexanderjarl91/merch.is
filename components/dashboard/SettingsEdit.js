import styles from "../../styles/Dashboard/Settings.module.css";
import { UsersContext } from "../../context";
import React, { useState, useContext, useEffect } from "react";
import { db, storage } from "../../fire";

export default function SettingsEdit() {
  const {
    userData,
    refreshUserData,
    urlAvailable,
    checkUrlAvailability,
    setUrl,
    url,
  } = useContext(UsersContext);

  const [bio, setBio] = useState();
  const [name, setName] = useState();
  const [logo, setLogo] = useState();
  const [social, setSocial] = useState();
  const [edit, setEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [image, setImage] = useState(null);

  const clearErrors = () => {
    setErrorMessage();
  };

  //set original states once userData kicks in
  useEffect(() => {
    setBio(userData.store.bio);
    setName(userData.store.name);
    setLogo(userData.store.logo);
    setSocial(userData.store.social);
    setUrl(userData.store.url);
  }, [userData]);

  //set image state as
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const updateStorage = () => {
    checkUrlAvailability();

    if (!urlAvailable) {
      console.log("URL UNAVAILABLE");
      setErrorMessage("Þessi hlekkur er frátekinn");
      return;
    }

    if (!image) {
      let imgUrl = userData.store.logo;
      updateFirebase(imgUrl);
      return;
    }

    const uploadTask = storage
      .ref(`${userData.email}/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(userData.email)
          .child(image.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateFirebase(imgUrl);
            return;
          });
      }
    );
  };

  const updateFirebase = async (imgUrl) => {
    const store = {
      name: name,
      logo: imgUrl,
      url: url,
      bio: bio,
      social: social,
    };

    //FORM VALIDATION

    db.collection("users").doc(userData.email).update({ store: store });
    refreshUserData();
    setEdit(false);
  };

  if (!userData) return null;

  return (
    <>
      <div className={styles.store_grid}>
        <div className={styles.logo_grid}>
          <label className={styles.add_label}>Velja nýja mynd</label>
          <input
            id="img"
            className={styles.add_file}
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className={styles.user_info_grid}>
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
            <label className={styles.edit_label}>Social</label>
            <input
              onChange={(e) => {
                setSocial(e.target.value);
              }}
              className={styles.input}
              type="text"
              placeholder={userData.store.social}
            ></input>
          </div>

          <div>
            <label className={styles.edit_label}>Þinn hlekkur</label>
            <div style={{ display: "flex" }}>
              <p className={styles.input}>merchis.netlify.com/</p>
              <input
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                className={styles.input}
                type="text"
                placeholder={userData.store.url}
              ></input>
            </div>
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
          <button
            className={styles.store_button_cancel}
            onClick={() => {
              setEdit(false);
              clearErrors();
            }}
          >
            hætta við
          </button>
          <button
            className={styles.store_button_confirm}
            onClick={() => {
              updateStorage();
              clearErrors();
            }}
          >
            vista
          </button>
          <button
            onClick={() => {
              checkUrlAvailability();
            }}
          >
            checkUrlAvailability()
          </button>
          <button
            onClick={() => {
              console.log(urlAvailable);
            }}
          >
            console.log(urlAvailable)
          </button>
        </div>

        {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      </div>
    </>
  );
}
