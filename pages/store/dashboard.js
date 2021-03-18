import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../fire";
import { UsersContext } from "../context";
import DashHeader from "../../components/dashboard/DashHeader";
import Products from "../../components/dashboard/Products";
import Orders from "../../components/dashboard/Orders";
import Add from "../../components/dashboard/Add";
import Yfirlit from "../../components/dashboard/Yfirlit";
import Sidemenu from "../../components/dashboard/sidemenu";
import styles from "../../styles/Dashboard.module.css";

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
    <div className={styles.dashboard_bg}>
      <DashHeader />
      <div className={styles.dashboard_grid}>
        <div className={styles.sidemenu_container}>
          <Sidemenu
            componentShowing={componentShowing}
            setComponentShowing={setComponentShowing}
          />
        </div>
        {/* <div className={styles.component_container}>
          <h1> Yfirlit</h1>
        </div> */}
        {componentShowing == "dashboard" ? <Yfirlit /> : null}
        {componentShowing == "products" ? <Products /> : null}
        {componentShowing == "add" ? <Add /> : null}
        {componentShowing == "orders" ? <Orders /> : null}
      </div>
    </div>
  );
}
