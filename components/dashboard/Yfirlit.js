import styles from "../../styles/Dashboard/Yfirlit.module.css";
import { auth, db } from "../../fire";
import { UsersContext } from "../../context";
import React, { useState, useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

export default function Yfirlit({}) {
  const { userData, refreshUserData } = useContext(UsersContext);
  const [realTimeData, setRealTimeData] = useState({});
  const [totalSum, setTotalSum] = useState(0);
  const [fulfilledOrders, setFulfilledOrders] = useState(0);

  //add the total of all orders on mount
  useEffect(() => {
    getTotalSum();
  }, []);

  //get new sums everytime userData changes for live numbers
  useEffect(() => {
    getTotalSum();
  }, [userData]);

  //get total sum function
  const getTotalSum = async () => {
    let orderPriceArray = [0];
    if (userData && userData.orders) {
      userData.orders.forEach((order) => {
        orderPriceArray = [...orderPriceArray, order.price];
      });
    }
    let total = await orderPriceArray.reduce((a, b) => {
      return +a + +b;
    });
    setTotalSum(total);
  };

  //get total fulfilled orders
  const getFulfilledOrders = () => {
    if (userData && userData.orders) {
      userData.orders.forEach((order) => {
        if (order.fulfilled) {
          setFulfilledOrders(fulfilledOrders + 1);
        }
      });
    }
  };

  //on mount, if user is logged in, run an observer that refreshes userData whenever theres a change
  useEffect(() => {
    if (auth.currentUser) {
      //subscribing to changes in users collection
      const doc = db.collection("users").doc(auth.currentUser.email);
      //refresh userData every time this specific doc changes
      const observer = doc.onSnapshot((docSnapshot) => {
        refreshUserData();
      });
    }
  }, []);

  // Div
  // icon
  // Tala
  // Texti
  // /div

  return (
    <div className={styles.component_container}>
      <p className={styles.title}> Yfirlit</p>

      <div className={styles.yfirlit_grid}>
        <div className={styles.yfirlit_grid_box1}>
          {userData && userData.orders ? (
            <div className={styles.box_head}>
              <RiMoneyDollarCircleFill className={styles.icon} />
              <p>Sala samtals</p>
              <p className={styles.totalSum}>{totalSum} ISK</p>
            </div>
          ) : null}
        </div>

        <div className={styles.yfirlit_grid_box2}>
          {userData && userData.products ? (
            <div className={styles.box_head}>
              <MdShoppingCart className={styles.icon} />
              <p>Vörurmagn</p>
              <p>{userData.products.length}</p>
            </div>
          ) : null}
        </div>

        <div className={styles.yfirlit_grid_box3}>
          {userData && userData.orders ? (
            <div className={styles.box_head}>
              <FaShoppingBag className={styles.icon} />
              <p>Pantanir alls</p>
              <p>{userData.orders.length}</p>
            </div>
          ) : null}
        </div>

        <div className={styles.yfirlit_grid_box4}>
          {userData && userData.orders ? (
            <div className={styles.box_head}>
              <FaCheckCircle className={styles.icon} />
              <p>Kláraðar pantanir </p>
              <p>{fulfilledOrders}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.table}>
        <p className={styles.table_header}>Pantnair</p>
        <table>
          <tr>
            <th>Pantanir alls:</th>
            <td> 19</td>
          </tr>
          <tr>
            <th>Ókláraðar pantanir:</th>

            <td>2</td>
          </tr>
          <tr>
            <th>Cancel pantanir: </th>
            <td>1</td>
          </tr>
          <tr>
            <th>Sendar pantanir:</th>

            <td>12</td>
          </tr>
        </table>
      </div>

      <div>
        <p className={styles.table_header}>Vinsælasta varan þín:</p>
        <img className={styles.popular_product} src="" />
      </div>
    </div>
  );
}
