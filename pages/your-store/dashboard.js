import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

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
  } = useContext(UsersContext);

  return (
    <div>
      <p>DASHBOARD</p>
      <button
        onClick={() => {
          console.log(currentUser);
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
