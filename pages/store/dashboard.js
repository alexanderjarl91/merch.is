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
import Store from "../../components/dashboard/Store";
import styles from "../../styles/Dashboard/Dashboard.module.css";

const dashboard = () => {
  const router = useRouter();
  const { users, currentUser, getUserData, setCurrentUser } = useContext(
    UsersContext
  );

  //get user data when users changes
  //push to root if theres no currentUser
  useEffect(() => {
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
      </div>
    </div>
  );
};

//protected route component
// put component or page through this function, render it if it passes.
const protectedRoute = (dashboard) => {
  const { users, currentUser } = useContext(UsersContext);
  const [userLogged, setUserLogged] = useState();
  const router = useRouter();

  useEffect(() => {
    setUserLogged(!currentUser);
  }, [users]);

  if (userLogged === true) {
    return dashboard;
  } else if (userLogged === false) {
    router.push("/");
    return;
  } else {
    return null;
  }
};

export default dashboard;
