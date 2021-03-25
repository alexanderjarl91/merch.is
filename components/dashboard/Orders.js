import styles from "../../styles/Dashboard/Orders.module.css";
import React, { useContext } from "react";
import { UsersContext } from "../../context";

export default function Orders() {
  const { users, currentUser } = useContext(UsersContext);
  return (
    <div className="component_container">
      <p className="title">Pantanir</p>
      <p>under construction..</p>
    </div>
  );

  // return <p> {userData.products[0].productDescription} </p>;
}
