import styles from "../../styles/Dashboard/Settings.module.css";
import { UsersContext } from "../../context";
import React, { useState, useContext, useEffect } from "react";
import { db, storage } from "../../fire";

export default function Settings() {
  const { userData, refreshUserData, urlAvailable, setUrl, url } = useContext(
    UsersContext
  );

  const [bio, setBio] = useState();
  const [name, setName] = useState();
  const [logo, setLogo] = useState();
  const [social, setSocial] = useState();
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState();

  const clearErrors = () => {
    setError();
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

  const saveChanges = () => {
    //BEGIN WITH FORM VALIDATION so that image doesnt get uploaded if theres an error

    //return if name is less than 3 or more than 12 characters
    if (name.length < 3 || name.length > 25) {
      setError("Búðarnafn má mest vera minnst vera 3 stafir og mest 25");
      return;
    }

    //return if url is not available and url is not the same as it was in database
    if (!urlAvailable && url !== userData.store.url) {
      console.log("URL UNAVAILABLE");
      setError("Þessi hlekkur er frátekinn");
      return;
    }

    // return if url includes a space
    if (/\s/.test(url)) {
      setSignUpError(
        "Hlekkurinn þinn má ekki innihald bil eða önnur sérstök tákn"
      );
      return;
    }

    //return if there is no image uploaded, set imgUrl to what is was originally (case: user is not changing store logo)
    if (!image) {
      let imgUrl = userData.store.logo;
      updateFirebase(imgUrl);
      return;
    }

    //upload image to storage
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
        //then get the URL for that specific image and call updateFirebase with the url as a parameter
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

    db.collection("users").doc(userData.email).update({ store: store });
    refreshUserData();
    setEdit(false);
    setError();
  };

  if (!userData) return null;

  return (
    <div className="component_container">
      <p className="title"> Stillingar </p>
      {edit ? (
        <>
          <div className={styles.store_edit_grid}>
            <div className={styles.user_info_grid_edit}>
              <div className={styles.store_name_edit}>
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

              <div className={styles.store_about_edit}>
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

              <div className={styles.store_social_edit}>
                <label className={styles.edit_label}>
                  Linkur á samfélagsmiðilinn þinn
                </label>
                <input
                  onChange={(e) => {
                    setSocial(e.target.value);
                  }}
                  className={styles.input}
                  type="text"
                  placeholder={userData.store.social}
                ></input>
              </div>

              <div className={styles.store_hlekkur_edit}>
                <label className={styles.edit_label}>
                  Linkurinn á búðina þína
                </label>
                <div style={{ display: "flex" }}>
                  <p className={styles.input_store_link}>
                    merch-is.vercel.app/
                  </p>
                  <input
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    className={styles.input_store_link_name}
                    type="text"
                    placeholder={userData.store.url}
                  ></input>
                </div>
              </div>

              <div className={styles.store_img_edit}>
                <label className={styles.edit_label}>Velja nýja mynd</label>
                <input
                  id="img"
                  className={styles.edit_file}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <div className={styles.store_buttons_edit}>
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
                  saveChanges();
                }}
              >
                vista
              </button>
            </div>

            {/* CHECK URL AVAILABILITY BUTTONS */}
            {/* <button
                onClick={() => {
                  checkUrlAvailability(url);
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
              </button> */}
          </div>
        </>
      ) : (
        // This is what is showing when the user first visit the setting page
        <>
          <div className={styles.store_grid}>
            <div className={styles.logo_grid}>
              <img className={styles.user_logo_img} src={userData.store.logo} />
            </div>
            <div className={styles.user_info_grid}>
              <p className={styles.user_name}>{userData.store.name}</p>

              <a
                target="_blank"
                href={userData.store.social}
                className={styles.user_url}
              >
                {" "}
                {userData.store.social}
              </a>

              <p className={styles.user_bio}>{userData.store.bio}</p>

              <p className={styles.user_hlekkur}>
                {" "}
                Þinn hlekkur:{" "}
                <a
                  href={`merch-is.vercel.app/${userData.store.url}`}
                  target="_blank"
                  className={styles.user_merch_linkur}
                >
                  merch-is.vercel.app/{userData.store.url}
                </a>
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
