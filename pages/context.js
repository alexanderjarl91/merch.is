import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import fire, { auth, db } from "./fire";

export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  //initializing next router
  const router = useRouter();

  //signup/login string states
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("alexanderjarl91@gmail.com");
  const [password, setPassword] = useState("test123");

  //auth state listener, if not user is found, redirects
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        setUserData("virkar");
        console.log("user is signed in from subscriber");
        //match auth user email to database and send that document as userData

        setCurrentUser(auth.currentUser);
        router.push("/your-store/dashboard");
      } else {
        console.log("no user signed in from subscriber");
        setCurrentUser();
        router.push("/landing");
      }
    });
  }, []);

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
        console.log("first log");
        //creating users data in firebase
        const userUid = auth.currentUser.uid;
        const email = auth.currentUser.email;
        const name = auth.currentUser.displayName;
        console.log("second log");

        const account = {
          email: email,
          name: name,
          userid: userUid,
          store: {
            logo: "img.png",
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
        console.log("third log");

        //pushing account to users with the email as document name
        db.collection("users").doc(email).set(account);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // login with email and password
  const handleLogin = async () => {
    await auth.signInWithEmailAndPassword(email, password).catch((err) => {
      console.log(err);
    });
  };

  //log user out
  const handleLogout = async () => {
    await auth.signOut().then(() => {
      router.push("/landing");
    });
    if (auth.currentUser) {
      console.log("something went wrong with logout");
    } else {
      console.log("user logged out");
    }
  };

  //////////
  const getUsers = async () => {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    //matching users UNFINISHED
    const foundUser = users.find((x) => x.email === user.email);
  };

  useEffect(() => {
    getUsers();
  }, [userData]);

  return (
    <UsersContext.Provider
      value={{
        currentUser,
        name,
        email,
        password,
        getUsers,
        setCurrentUser,
        setEmail,
        setName,
        setPassword,
        handleSignup,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
