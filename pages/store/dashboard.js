import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../fire";

import { UsersContext } from "../context";

export default function dashboard() {
  const router = useRouter();
  const {
    userData,
    users,
    currentUser,
    handleLogout,
    getUsers,
    getUserData,
    setCurrentUser,
  } = useContext(UsersContext);

  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, [auth.currentUser]);

  useEffect(() => {
    getUserData();
    if (!currentUser) {
      router.push("/");
    }
  }, [users]);

  return (
    <div>
      <p>DASHBOARD</p>
      <button
        onClick={() => {
          console.log(currentUser);
          console.log("auth:", auth.currentUser);
        }}
      >
        currentUser
      </button>
      <button
        onClick={() => {
          getUsers();
        }}
      >
        getUsers()
      </button>
      <button
        onClick={() => {
          getUserData();
        }}
      >
        getUserData()
      </button>
      <button
        onClick={() => {
          console.log(userData);
        }}
      >
        userData
      </button>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        log out
      </button>
    </div>
  );
}
