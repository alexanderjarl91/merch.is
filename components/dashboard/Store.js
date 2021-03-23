import styles from "../../styles/Dashboard/Store.module.css";
import { UsersContext } from "../../pages/context";
import React, { useState, useContext, useEffect } from "react";
import { db, storage } from "../../pages/fire";

export default function Store() {
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
      updateStore(imgUrl);
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
            updateStore(imgUrl);
            return;
          });
      }
    );
  };

  const updateStore = async (imgUrl) => {
    const store = {
      name: name,
      logo: imgUrl,
      url: url,
      bio: bio,
      social: social,
    };

    //FORM VALIDATION

    // if (/\s/.test(url)) {
    //   setErrorMessage(
    //     "Hlekkurinn þinn má ekki innihalda bil eða aðra sérstaka stafi"
    //   );
    //   return;
    // }

    // if (url.length < 3 || url.length > 10) {
    //   setErrorMessage(
    //     "Hlekkurinn þinn verður að vera minnst 3 stafir og mest 10"
    //   );
    //   return;
    // }

    // if (name.length < 2) {
    //   setErrorMessage("Nafn verður að vera lengra en 1 stafur");
    //   return;
    // }

    db.collection("users").doc(userData.email).update({ store: store });
    refreshUserData();
    setEdit(false);
  };

  if (!userData) return null;

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
                <p>merch.is</p>
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

            <div className={styles.seccond_grid}>
              <label className={styles.add_label}>Velja nýja mynd</label>
              <input
                id="img"
                className={styles.add_file}
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div>
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
            {errorMessage ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : null}
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
              <strong>Hlekkur á social: </strong>
              {userData.store.social}
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
            <a className={styles.user_merch_linkur}>
              www.merch.is/{userData.store.url}
            </a>
          </div>
        </>
      )}
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
