import styles from "../../styles/Dashboard/Settings.module.css";
import { UsersContext } from "../../context";
import React, { useState, useContext, useEffect } from "react";
import { db, storage } from "../../fire";
import SettingsEdit from "../../components/dashboard/SettingsEdit";

export default function Settings() {
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
  const [image, setImage] = useState(null);
  const [error, setError] = useState();

  const clearErrors = () => {};

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
    if (name.length < 3) {
      setError("name to short");
      return;
    }

    // checkUrlAvailability();

    // if (!urlAvailable) {
    //   console.log("URL UNAVAILABLE");
    //   setErrorMessage("Þessi hlekkur er frátekinn");
    //   return;
    // }

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

    db.collection("users").doc(userData.email).update({ store: store });
    refreshUserData();
    setEdit(false);
  };

  if (!userData) return null;

  return (
    <div className={styles.component_container}>
      <p className={styles.title}> Stillingar </p>
      {edit ? (
        <>
          <SettingsEdit />
        </>
      ) : (
        // This is what is showing when the user first visit the setting page
        <>
          <div className={styles.store_grid}>
            <div className={styles.logo_grid}>
              <img className={styles.user_logo_img} src={userData.store.logo} />
            </div>
            <div className={styles.user_info_grid}>
              <p className={styles.user_name}>
                {" "}
                <strong> Nafnið þitt: </strong>
                {userData.store.name}
              </p>

              <p className={styles.user_url}>
                {" "}
                <strong>Linkur á samfélagsmiðilinn þinn: </strong>
                {userData.store.social}
              </p>

              <p className={styles.user_bio}>
                <strong>Um búðina þína: </strong>
                {userData.store.bio}
              </p>

              <p className={styles.user_hlekkur}>
                {" "}
                <strong>Linkurinn á búðina þína: </strong>
                <button className={styles.user_merch_linkur}>
                  merchis.netlify.com/{userData.store.url}
                </button>
              </p>

              <button
                className={styles.store_button_change}
                onClick={() => {
                  setEdit(true);
                }}
              >
                Breyta upplýsingum
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
