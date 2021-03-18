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
  const [email, setEmail] = useState("alexanderjarl91@gmail.com");
  const [password, setPassword] = useState("allicool1");

  const handleSignup = () => {
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
        const name = auth.currentUser.displayName;

        const account = {
          email: email,
          name: name,
          userid: userUid,
          store: {
            name: "yourstore",
            logo: "https://www.dafont.com/forum/attach/orig/8/3/830759.png",
            url: "www.yourwebsite.com",
            bio: "a description of your page",
          },
          products: [
            {
              productName: "Demo T-Shirt",
              productPrice: 8990,
              productImg: "img.png",
              productId: 123,
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
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
        console.log(err);
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
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
