import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../fire";
import { UsersContext } from "../context";
import DashHeader from "../../components/dashboard/DashHeader";
import Products from "../../components/dashboard/Products";
import Orders from "../../components/dashboard/Orders";
import Add from "../../components/dashboard/Add";
import Yfirlit from "../../components/dashboard/Yfirlit";
import Edit from "../../components/dashboard/Edit";
import Sidemenu from "../../components/dashboard/sidemenu";
import Store from "../../components/dashboard/Store";
import styles from "../../styles/Dashboard/Dashboard.module.css";

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
    getUserData();
  }, []);

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
    <div className={styles.dashboard_bg}>
      <DashHeader />
      <div className={styles.dashboard_grid}>
        <div className={styles.sidemenu_container}>
          <Sidemenu
            componentShowing={componentShowing}
            setComponentShowing={setComponentShowing}
          />
        </div>

        {componentShowing == "dashboard" ? <Yfirlit /> : null}
        {componentShowing == "store" ? <Store /> : null}
        {componentShowing == "products" ? <Products /> : null}
        {componentShowing == "add" ? (
          <Add setComponentShowing={setComponentShowing} />
        ) : null}
        {componentShowing == "orders" ? <Orders /> : null}

        {componentShowing == "edit" ? (
          <Edit setComponentShowing={setComponentShowing} />
        ) : null}
      </div>
    </div>
  );
}
