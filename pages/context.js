import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import fire, { auth, db } from "./fire";

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

  const clearErrors = () => {
    setSignUpError();
    setLoginError();
  };
  useEffect(() => {
    clearErrors();
  }, []);

  //check if url already exists and set state accordingly
  const checkUrlAvailability = () => {
    let allStores = [];
    users.forEach((user) => {
      allStores = [...allStores, user.store.url];
    });
    console.log("all stores:", allStores);
    console.log(url);
    const match = allStores.find((store) => store == url);
    if (match) {
      console.log(match, "is already taken");
      setUrlAvailable(false);
      console.log("url should be false");
      console.log(urlAvailable);
    } else {
      setUrlAvailable(true);
      console.log(urlAvailable);
    }
  };

  const handleSignup = () => {
    clearErrors();

    if (urlAvailable == false) {
      setSignUpError("Þessi hlekkur er frátekinn");
      return;
    }

    if (name.length == 0) {
      setSignUpError("Þú gleymdir að skrá nafnið þitt");
      return;
    }

    if (storeName.length == 0) {
      setSignUpError("Þú gleymdir að velja heiti á verslunina þína");
      return;
    }

    if (url.length == 0) {
      setSignUpError(
        "Þú verður að velja hlekk svo fólk geti skoðað verslunina þína"
      );
      return;
    }

    if (url.length > 0 && url.length < 4) {
      setSignUpError("Hlekkurinn verður að vera minnst 4 bók- eða tölustafir");
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
            logo:
              "https://store.sabaton.net/wp-content/uploads/2020/12/poison-gas-tshirt-back-sabaton-T19168.png",
            url: url,
            social: social,
            bio: "a description of your page",
          },
          products: [
            {
              productName: "Demo T-Shirt",
              productPrice: 8990,
              productImg:
                "https://store.sabaton.net/wp-content/uploads/2020/12/poison-gas-tshirt-back-sabaton-T19168.png",
              productId: "TS662",
              productDescription: "A very cool t-shirt",
              productStock: 5,
            },
          ],
        };

        //pushing account to users with the email as document name
        db.collection("users").doc(email).set(account);
        setCurrentUser(auth.currentUser);
        getUserData();
      })
      .catch((err) => {
        //FIRESTORE ERROR HANDLING
        console.log(err);
        switch (err.code) {
          case "auth/invalid-email":
            setSignUpError("Innsláttarvilla í netfangi");
            break;
          case "auth/weak-password":
            setSignUpError("Lykilorð verður að vera minnst 6 stafir");
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
            setLoginError("Innsláttarvilla í netfangi");
            break;
          case "auth/user-not-found":
            setLoginError("Notandi fannst ekki. Slóstu netfangið rétt inn?");
            break;
          case "auth/wrong-password":
            setLoginError("Lykilorð vitlaust slegið inn");
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

  //FIRESTORE STUFF
  const getUsers = async () => {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    let tempUsers = [];
    await snapshot.forEach((doc) => {
      tempUsers = [...tempUsers, doc.data()];
    });
    setUsers(tempUsers);
  };

  useEffect(() => {
    getUsers();
  }, [currentUser]);

  //function to match auth user to firestore user
  const getUserData = () => {
    if (currentUser) {
      const foundUser = users.find((x) => x.email === currentUser.email);
      setUserData(foundUser);
      // console.log("USER FOUND:", foundUser);
    } else {
      console.log("no currentUser");
    }
  };

  const refreshUserData = async () => {
    const userSnapshot = await db.collection("users").doc(userData.email).get();
    const tempUserData = await userSnapshot.data();
    console.log(tempUserData);
    if (tempUserData) {
      console.log("running refresh function");
      setUserData(tempUserData);
    } else {
      console.log("refreshing error");
    }
  };

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
        setSignUpError,
        setStoreName,
        setSocial,
        setUrl,
        getUserData,
        getUsers,
        setCurrentUser,
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
