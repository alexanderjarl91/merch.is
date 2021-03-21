import styles from "../../styles/Dashboard/Yfirlit.module.css";
import { auth, db } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useState, useEffect, useContext } from "react";

export default function Yfirlit() {
  const {
    userData,
    users,
    currentUser,
    refreshUserData,
    getUserData,
  } = useContext(UsersContext);
  const [totalSum, setTotalSum] = useState(0)
const [fulfilledOrders, setFulfilledOrders] = useState(0)


//get total $$ sum
const getTotalSum = async () => {
  let orderPriceArray = [0]
  if (userData && userData.orders) {
    userData.orders.forEach((order) => {
      orderPriceArray = [...orderPriceArray, order.price]
    })
  }
  const total = await orderPriceArray.reduce((a, b) => {
    return (+a)+(+b);
  })
  setTotalSum(total)
}

//get total fulfilled orders
const getFulfilledOrders = () =>{
  if (userData && userData.orders) {
    userData.orders.forEach((order) => {
      if (order.fulfilled) {
        setFulfilledOrders(fulfilledOrders + 1)
      }
    })
  }
}




  return (
    <div className={styles.component_container}>
      <p className={styles.title}> Yfirlit</p>

      <div className={styles.yfirlit_grid}>
        
        <div className={styles.yfirlit_grid_box1}>
          {userData && userData.orders? <div>
            <p>Sala samtals</p>
            <p>{totalSum} ISK</p>
          </div> : null}
        </div>
        <div className={styles.yfirlit_grid_box1}>
          {userData && userData.products? <div>
            <p>products</p>
            <p>{userData.products.length}</p>

          </div> : null}
        </div>
        <div className={styles.yfirlit_grid_box1}>
          {userData && userData.orders? <div>
            <p>total orders</p>
            <p>{userData.orders.length}</p>
          </div> : null}
        </div>
        <div className={styles.yfirlit_grid_box1}>
          {userData && userData.orders? <div>
            <p>completed orders</p>
            <p>{fulfilledOrders}</p>

          </div> : null}
        </div>
      </div>
      <button style={{ color: "black" }} onClick={() => {}}>
        Takki sem gerir ekkert
      </button>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
