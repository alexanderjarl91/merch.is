import styles from "../../styles/DashboardHeader.module.css";
import { auth } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext } from "react";

export default function Products() {
  const { userData, users, currentUser } = useContext(UsersContext);
  return <p> Products</p>;
  // return <p> {userData.products[0].productDescription} </p>;
}
