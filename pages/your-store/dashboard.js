import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { UsersContext } from "../context";

export default function dashboard() {
  const router = useRouter();
  const { userData, currentUser, handleLogout } = useContext(UsersContext);

  return (
    <div>
      <p>DASHBOARD</p>
      <button
        onClick={() => {
          console.log(currentUser);
        }}
      >
        log user
      </button>
      <button
        onClick={() => {
          console.log(userData);
        }}
      >
        DATA
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
