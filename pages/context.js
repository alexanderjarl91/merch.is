import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import fire, { auth, db } from "./fire";

export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  //initializing next router
  const router = useRouter();

  //signup/login string states
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("alexanderjarl91@gmail.com");
  const [password, setPassword] = useState("test123");

  //auth state listener, if not user is found, redirects
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        console.log("user is signed in from subscriber");
        // router.push("/your-store/dashboard");
        //match auth user email to database and send that document as userData
        setCurrentUser(auth.currentUser);
        getUserData();
      } else {
        console.log("no user signed in from subscriber");
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

  //FIRESTORE STUFF
  const getUsers = async () => {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    let tempUsers = [];
    await snapshot.forEach((doc) => {
      tempUsers = [...tempUsers, doc.data()];
    });
    setUsers(tempUsers);
    console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, [currentUser]);

  //function to match auth user to firestore user
  const getUserData = () => {
    if (currentUser) {
      const foundUser = users.find((x) => x.email === currentUser.email);
      setUserData(foundUser);
      console.log("USER FOUND:", foundUser);
    } else {
      console.log("no currentUser");
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
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
