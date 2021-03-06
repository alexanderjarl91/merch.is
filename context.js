import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "./fire";

export const UsersContext = React.createContext();
export const UsersProvider = ({ children }) => {
  //initializing next router
  const router = useRouter();
  //signup/login string states
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [social, setSocial] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [urlAvailable, setUrlAvailable] = useState();

  //clear errors on mount
  useEffect(() => {
    clearErrors();
  }, []);

  // clear error function
  const clearErrors = () => {
    setSignUpError();
    setLoginError();
  };

  //check url availability everytime url changes
  useEffect(() => {
    checkUrlAvailability(url);
    console.log(url);
  }, [url]);

  // refresh userData as
  const refreshUserData = async () => {
    const userSnapshot = await db
      .collection("users")
      .doc(auth.currentUser.email)
      .get();
    const tempUserData = await userSnapshot.data();
    if (tempUserData) {
      console.log("running refresh function");
      setUserData(tempUserData);
    }
  };

  //check if url already exists and set state accordingly
  const checkUrlAvailability = (url) => {
    let allStores = [];
    users.forEach((user) => {
      allStores = [...allStores, user.store.url];
    });
    console.log(allStores);
    const match = allStores.find((storeUrl) => storeUrl == url);
    console.log(match);

    if (match) {
      setUrlAvailable(false);
      console.log("match found, cancelling");
      return;
    } else {
      console.log("no match, url is available");
      setUrlAvailable(true);
    }
  };

  const handleSignup = () => {
    // FORM VALIDATION
    clearErrors();
    if (urlAvailable == false) {
      setSignUpError("??essi hlekkur er fr??tekinn");
      return;
    }
    if (name.length == 0 || name.length < 3 || name.length > 15) {
      setSignUpError("Nafn ver??ur a?? vera minnst 3 stafir og mest 15");
      return;
    }

    if (storeName.length == 0) {
      setSignUpError("???? gleymdir a?? velja heiti ?? verslunina ????na");
      return;
    }

    if (storeName.length < 3 || storeName.length > 25) {
      setSignUpError("B????arnafn m?? mest vera minnst vera 3 stafir og mest 25");
      return;
    }

    if (url.length == 0) {
      setSignUpError(
        "???? ver??ur a?? velja hlekk svo f??lk geti sko??a?? verslunina ????na"
      );
      return;
    }

    if (url.length > 0 && url.length < 3) {
      setSignUpError("Hlekkurinn ver??ur a?? vera minnst 4 b??k- e??a t??lustafir");
      return;
    }

    if (url.length < 3 || url.length > 10) {
      setSignUpError(
        "Hlekkurinn ??inn ver??ur a?? vera minnst 3 stafir og mest 10"
      );
      return;
    }

    if (/\s/.test(url)) {
      setSignUpError(
        "Hlekkurinn ??inn m?? ekki innihald bil e??a ??nnur s??rst??k t??kn"
      );
      return;
    }

    //creating firebase auth user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        auth.currentUser.updateProfile({
          displayName: name,
          photoURL:
            "https://herrmans.eu/wp-content/uploads/2019/01/765-default-avatar.png",
        });
      })
      .then(async () => {
        //creating users data in firebase
        const userUid = auth.currentUser.uid;
        const email = auth.currentUser.email;

        const account = {
          email: email,
          name: name,
          userid: userUid,
          orders: [],
          store: {
            name: storeName,
            logo: "https://i.ibb.co/tbPsmY0/logo.png",
            url: url,
            social: social,
            bio: "H??r getur ???? skrifa?? kynningu ?? b????inni ??inni",
          },
          products: [
            {
              productName: "Prufuvara",
              productPrice: 8990,
              productImg:
                "https://store.sabaton.net/wp-content/uploads/2020/12/poison-gas-tshirt-back-sabaton-T19168.png",
              productId: "TS662",
              productDescription: "Svartur bolur",
              productStock: 5,
            },
          ],
        };

        //pushing account to users with the email as document name
        db.collection("users")
          .doc(email)
          .set(account)
          .then(() => {
            setCurrentUser(auth.currentUser);
            refreshUserData();
          });
      })
      .catch((err) => {
        //FIRESTORE ERROR HANDLING
        console.log(err);
        switch (err.code) {
          case "auth/invalid-email":
            setSignUpError("Innsl??ttarvilla ?? netfangi");
            break;
          case "auth/weak-password":
            setSignUpError("Lykilor?? ver??ur a?? vera minnst 6 stafir");
            break;
        }
      });
  };

  // login with email and password
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setCurrentUser(auth.currentUser);
        getUserData();
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            setLoginError("Innsl??ttarvilla ?? netfangi");
            break;
          case "auth/user-not-found":
            setLoginError("Notandi fannst ekki. Sl??stu netfangi?? r??tt inn?");
            break;
          case "auth/wrong-password":
            setLoginError("Lykilor?? vitlaust slegi?? inn");
            break;
        }
        return;
      });
  };

  //log user out
  const handleLogout = async () => {
    auth.signOut().then(() => {
      console.log("logout successful");
      setCurrentUser();
      router.push("/");
    });
  };

  const getUsers = async () => {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    let tempUsers = [];
    await snapshot.forEach((doc) => {
      tempUsers = [...tempUsers, doc.data()];
    });
    setUsers(tempUsers);
  };

  //function to match auth user to firestore user
  const getUserData = async () => {
    const foundUser = users.find((x) => x.email === auth.currentUser.email);
    setUserData(foundUser);
  };

  useEffect(async () => {
    if (!currentUser) return;
    refreshUserData();
  }, [currentUser]);

  useEffect(() => {
    getUsers();
  }, []);

  //set currentUser when auth.currentUser changes
  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, [auth.currentUser]);

  return (
    <UsersContext.Provider
      value={{
        currentUser,
        userData,
        users,
        name,
        email,
        password,
        social,
        url,
        storeName,
        loginError,
        signUpError,
        urlAvailable,
        setSignUpError,
        setStoreName,
        setSocial,
        setUrl,
        getUserData,
        getUsers,
        setCurrentUser,
        setUserData,
        setEmail,
        setName,
        setPassword,
        handleSignup,
        handleLogin,
        handleLogout,
        refreshUserData,
        checkUrlAvailability,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
