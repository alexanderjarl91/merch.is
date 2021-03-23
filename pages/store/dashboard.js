import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "../../context";
import DashHeader from "../../components/dashboard/DashHeader";
import Products from "../../components/dashboard/Products";
import Orders from "../../components/dashboard/Orders";
import Add from "../../components/dashboard/Add";
import Yfirlit from "../../components/dashboard/Yfirlit";
import Sidemenu from "../../components/dashboard/Sidemenu";
import Settings from "../../components/dashboard/Settings";
import styles from "../../styles/Dashboard/Dashboard.module.css";

const dashboard = () => {
  const router = useRouter();
  const { users, currentUser, userData } = useContext(UsersContext);
  //get user data when users changes
  //push to root if theres no currentUser
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [users]);

  const [componentShowing, setComponentShowing] = useState("dashboard");

  return (
    <>
      {userData ? (
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
            {componentShowing == "store" ? <Settings /> : null}
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
      ) : (
        <div className={styles.dashboard_bg} style={{ height: "100vh" }}>
          <p>loading</p>
        </div>
      )}
    </>
  );
};

export default dashboard;
