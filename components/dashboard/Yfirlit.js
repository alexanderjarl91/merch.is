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
  const [lastProduct, setLastProduct] = useState();

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

  //get data on mount
  useEffect(() => {
    getDashboardData();
  }, []);

  //get new data everytime userData changes for live numbers
  useEffect(() => {
    getDashboardData();
  }, [userData]);

  const getDashboardData = () => {
    //get newest product
    const getNewestProduct = () => {
      if (userData && userData.products) {
        const foundlastProduct =
          userData.products[userData.products.length - 1];
        setLastProduct(foundlastProduct);
        console.log(lastProduct);
      }
    };
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
      let totalFulfilled = 0;
      if (userData && userData.orders) {
        userData.orders.forEach((order) => {
          if (order.fulfilled === true) {
            totalFulfilled = totalFulfilled + 1;
          }
          setFulfilledOrders(totalFulfilled);
        });
      }
    };

    //get total unfulfilled orders
    const getUnfulfilledOrders = () => {
      let totalUnfulfilled = 0;
      if (userData && userData.orders) {
        userData.orders.forEach((order) => {
          if (order.fulfilled === false) {
            totalUnfulfilled = totalUnfulfilled + 1;
          }
        });
        setUnfulfilledOrders(totalUnfulfilled);
      }
    };

    //run all the get functions
    getTotalSum();
    getFulfilledOrders();
    getUnfulfilledOrders();
    getNewestProduct();
  };

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
    let totalFulfilled = 0;
    if (userData && userData.orders) {
      userData.orders.forEach((order) => {
        if (order.fulfilled === true) {
          totalFulfilled = totalFulfilled + 1;
        }
        setFulfilledOrders(totalFulfilled);
      });
    }
  };

  //get total unfulfilled orders
  const getUnfulfilledOrders = () => {
    let totalUnfulfilled = 0;
    if (userData && userData.orders) {
      userData.orders.forEach((order) => {
        if (order.fulfilled === false) {
          totalUnfulfilled = totalUnfulfilled + 1;
        }
      });
      setUnfulfilledOrders(totalUnfulfilled);
    }
  };

  return (
    <div className="component_container">
      <p className="title"> Yfirlit</p>

      <div className={styles.yfirlit_grid}>
        {userData && userData.orders ? (
          <div className={styles.yfirlit_grid_box1}>
            <div className={styles.box_head}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                <p className={styles.number}>{totalSum} </p>
                <p style={{ opacity: 0.7, fontWeight: 500 }}>KR</p>
              </div>
              <p>
                {" "}
                <AiFillDollarCircle className={styles.icon} />
                Sala samtals
              </p>
            </div>
          </div>
        ) : null}

        <div className={styles.yfirlit_grid_box2}>
          {userData && userData.products ? (
            <div className={styles.box_head}>
              <p className={styles.number}>{userData.products.length}</p>
              {userData.products.length == 1 ? (
                <p>
                  {" "}
                  <AiOutlineAppstoreAdd className={styles.icon} />
                  Vara
                </p>
              ) : (
                <p>
                  {" "}
                  <AiOutlineAppstoreAdd className={styles.icon} />
                  Vörur
                </p>
              )}
            </div>
          ) : null}
        </div>

        <div className={styles.yfirlit_grid_box3}>
          {userData && userData.orders ? (
            <div className={styles.box_head}>
              <p className={styles.number}>{userData.orders.length}</p>
              <p>
                {" "}
                <FaShoppingBag className={styles.icon} />
                Pantanir alls
              </p>
            </div>
          ) : null}
        </div>

        <div className={styles.yfirlit_grid_box4}>
          {userData && userData.orders ? (
            <div className={styles.box_head}>
              <p className={styles.number}>{fulfilledOrders}</p>
              <p>
                {" "}
                <AiFillCheckCircle className={styles.icon} />
                Afgreitt{" "}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {userData && userData.orders ? (
        <>
          <div className={styles.order_popular_grid}>
            <div className={styles.table}>
              <p className="title">Pantanir</p>
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
                  <th>Afgreiddar pantanir:</th>
                  <td>{fulfilledOrders}</td>
                </tr>
              </table>
            </div>

            <div>
              <p className="title">Nýjasta varan þín</p>
              {lastProduct ? (
                <img
                  className={styles.popular_product}
                  src={lastProduct.productImg}
                />
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
