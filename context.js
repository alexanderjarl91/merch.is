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
    const clearErrors = () => {
      setSignUpError();
      setLoginError();
    };
    clearErrors();
  }, []);

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

    if (storeName.length < 3 || storeName.length > 15) {
      setSignUpError("Búðarnafn má mest vera minnst vera 3 stafir og mest 15");
      return;
    }

    if (url.length == 0) {
      setSignUpError(
        "Þú verður að velja hlekk svo fólk geti skoðað verslunina þína"
      );
      return;
    }

    if (url.length > 0 && url.length < 3) {
      setSignUpError("Hlekkurinn verður að vera minnst 4 bók- eða tölustafir");
      return;
    }

    if (url.length < 3 || url.length > 10) {
      setSignUpError(
        "Hlekkurinn þinn verður að vera minnst 3 stafir og mest 10"
      );
      return;
    }

    if (/\s/.test(url)) {
      setSignUpError(
        "Hlekkurinn þinn má ekki innihald bil eða önnur sérstök tákn"
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
            logo:
              "https://www.pngkit.com/png/detail/246-2467534_your-logo-here-png-your-brand-here-png.png",
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
