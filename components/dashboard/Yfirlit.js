import styles from "../../styles/Dashboard/Yfirlit.module.css";
import { auth, db } from "../../fire";
import { UsersContext } from "../../context";
import React, { useState, useEffect, useContext } from "react";
import {
  AiFillDollarCircle,
  AiFillCheckCircle,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";

export default function Yfirlit({}) {
  const { userData, refreshUserData } = useContext(UsersContext);
  const [totalSum, setTotalSum] = useState(0);
  const [fulfilledOrders, setFulfilledOrders] = useState(0);
  const [unfulfilledOrders, setUnfulfilledOrders] = useState(0);

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

  //add the total of all orders on mount
  useEffect(() => {
    getTotalSum();
    getFulfilledOrders();
    // getUnfulfilledOrders();
  }, []);

  //get new sums everytime userData changes for live numbers
  useEffect(() => {
    getTotalSum();
    getFulfilledOrders();
    // getUnfulfilledOrders();
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
      let totalFulfilled = 0
      let totalUnfulfilled = 0

      userData.orders.forEach((order) => {
         if (order.fulfilled === true) {
          totalFulfilled = totalFulfilled + 1
          console.log('totalFulfilled :>> ', totalFulfilled);
        } else if (!order.fulfilled) {
          totalUnfulfilled = totalFulfilled + 1
          console.log('totalUnfulfilled :>> ', totalUnfulfilled);
        }
        setFulfilledOrders(totalFulfilled)
        setUnfulfilledOrders(totalUnfulfilled)
      });
    }
  };


  return (
    <div className={styles.component_container}>
      <p className={styles.title}> Yfirlit</p>

      <div className={styles.yfirlit_grid}>
        {userData && userData.orders ? (
          <div className={styles.yfirlit_grid_box1}>
            <div className={styles.box_head}>
              <AiFillDollarCircle className={styles.icon} />
              <p>Sala samtals</p>
              <p className={styles.totalSum}>{totalSum} ISK</p>
            </div>
          </div>
        ) : null}

        <div className={styles.yfirlit_grid_box2}>
          {userData && userData.products ? (
            <div className={styles.box_head}>
              <AiOutlineAppstoreAdd className={styles.icon} />
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
              <AiFillCheckCircle className={styles.icon} />
              <p>Kláraðar pantanir </p>
              <p>{fulfilledOrders}</p>
            </div>
          ) : null}
        </div>
      </div>

      {userData && userData.orders ? (
        <>
        <div className={styles.order_popular_grid}> 
          <div className={styles.table}>
            <p className={styles.table_header}>Pantanir</p>
            <table>
              <tr>
                <th>Pantanir alls:</th>
                <td>{userData.orders.length}</td>
              </tr>
              <tr>
                <th>Óafgreiddar pantanir:</th>
                <td>{unfulfilledOrders}</td>
              </tr>
              <tr>
                <th>Cancel pantanir: </th>
                <td>X</td>
              </tr>
              <tr>
                <th>Afgreiddar pantanir:</th>
                <td>{fulfilledOrders}</td>
              </tr>
            </table>
          </div>

          <div>
            <p className={styles.table_header}>Vinsælasta varan þín:</p>
            <img className={styles.popular_product} src="" />
          </div>
          </div>
        </>
      ) : null}
      <button onClick={()=>{
        getFulfilledOrders()
      }}>button</button>
    </div>
  );
}
