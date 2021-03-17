import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../fire";
import { UsersContext } from "../context";
import DashHeader from "../../components/dashboard/DashHeader";
import Products from "../../components/dashboard/Products";
import Sidemenu from "../../components/dashboard/sidemenu";

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

  //set currentUser when auth.currentUser changes
  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, [auth.currentUser]);

  //get user data when users changes
  //push to root if theres no currentUser
  useEffect(() => {
    getUserData();
    if (!currentUser) {
      router.push("/");
    }
  }, [users]);

  const [componentShowing, setComponentShowing] = useState("dashboard");

  return (
    <div>
      <DashHeader />
      <Sidemenu
        componentShowing={componentShowing}
        setComponentShowing={setComponentShowing}
      />
      {componentShowing == "products" ? <Products /> : null}

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
