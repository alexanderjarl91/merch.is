import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "../../context";
import Head from "next/head";
import FooterStore from "../../components/store/FooterStore";
import styles from "../../styles/Store/Product.module.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { db } from "../../fire";

export default function Product() {
  const router = useRouter();
  const { users, getUsers } = useContext(UsersContext);
  const [storeOwner, setStoreOwner] = useState();
  const [orderSuccessful, setOrderSuccessful] = useState(false);
  const [showShare, setShowShare] = useState(false);

  //defining productId as the query.product
  const productId = router.query.product;

  //defining product as the item that matches the query
  const product = storeOwner
    ? storeOwner.products.find((x) => x.productId == productId)
    : null;

  //back function that pushes to the product owners store
  const back = () => {
    router.push(`/${router.query.store}`);
  };

  // toggle share buttons
  const toggleShare = () => {
    setShowShare(!showShare);
  };

  //setting new store owner data every time users changes
  useEffect(() => {
    const findOwner = users.find((x) => x.store.url == router.query.store);
    setStoreOwner(findOwner);
  }, [users]);

  //function that sends an order to storeowners database when called
  const purchaseItem = async () => {
    //renewing users data every time func is called
    await getUsers();
    //getting time of order
    var currentdate = new Date();
    var dateTime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();

    const order = {
      product: product.productName,
      productId: product.productId,
      price: product.productPrice,
      orderNumber: "ORD" + Math.floor(Math.random() * (1000 - 0) + 0),
      fulfilled: false,
      orderDate: dateTime,
    };

    //get orders and create a new array with orders plus the new order.
    const ordersCopy = storeOwner.orders;
    const updatedOrders = [...ordersCopy, order];

    //update orders in database with updatedOrders
    db.collection("users")
      .doc(storeOwner.email)
      .update({ orders: updatedOrders })
      .then(() => {
        setOrderSuccessful(true);
      });
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>{product ? `${product.productName}` : null} | merch.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.product_page}>
        {storeOwner ? (
          <div className={styles.container}>
            <div>
              <img className={styles.store_logo} src={storeOwner.store.logo} />
              {/* <p className={styles.store_social}>{storeOwner.store.social}</p> */}
            </div>
            <div className={styles.product}>
              <div className={styles.product_images}>
                {/* <div className={styles.product_smallImages}>
                <img
                  className={styles.product_smallImg}
                  src="https://images-na.ssl-images-amazon.com/images/I/81Af8as1z7L._AC_UL1500_.jpg"
                  alt=""
                />
                <img
                  className={styles.product_smallImg}
                  src="https://images-na.ssl-images-amazon.com/images/I/81Af8as1z7L._AC_UL1500_.jpg"
                  alt=""
                />
                <img
                  className={styles.product_smallImg}
                  src="https://images-na.ssl-images-amazon.com/images/I/81Af8as1z7L._AC_UL1500_.jpg"
                  alt=""
                />
                <img
                  className={styles.product_smallImg}
                  src="https://images-na.ssl-images-amazon.com/images/I/81Af8as1z7L._AC_UL1500_.jpg"
                  alt=""
                />
              </div> */}
                <img
                  className={styles.product_mainImg}
                  src={product.productImg}
                  alt=""
                />
              </div>
              <div className={styles.product_info}>
                <p className={styles.product_name}>{product.productName}</p>
                <p className={styles.product_description}>
                  {product.productDescription}
                </p>

                {orderSuccessful ? (
                  <h2 style={{ color: "black" }}>
                    PÖNTUN MÓTTEKIN, TAKK FYRIR AÐ VERSLA!
                  </h2>
                ) : (
                  <>
                    <h1 className={styles.product_price}>
                      {product.productPrice} KR
                    </h1>
                    <button
                      className={styles.product_buy_button}
                      onClick={purchaseItem}
                    >
                      KAUPA
                    </button>
                  </>
                )}

                <button onClick={toggleShare} className={styles.deila_buttona}>
                  DEILA ÞESSARI VÖRU
                </button>
                {showShare ? (
                  <div className={styles.share_buttons}>
                    <FacebookShareButton
                      quote="TESTING"
                      hashtag="#merch.is"
                      url={`https://merch-is.vercel.app/`}
                    >
                      <FacebookIcon
                        logoFillColor="white"
                        round={true}
                        width="35px"
                      />
                    </FacebookShareButton>
                    <TwitterShareButton
                      title={`Kíkið á vöruúrvalið hjá ${storeOwner.store.name}!`}
                      via="merch_is"
                      url="www.mbl.is"
                    >
                      <TwitterIcon
                        logoFillColor="white"
                        round={true}
                        width="35px"
                      />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      quote="TESTING"
                      hashtag="#merch.is"
                      url={`ourlink.com/}`}
                    >
                      <WhatsappIcon
                        logoFillColor="white"
                        round={true}
                        width="35px"
                      />
                    </WhatsappShareButton>
                  </div>
                ) : null}
              </div>
            </div>
            <button
              className={styles.back_button}
              onClick={() => {
                back();
              }}
            >
              FARA TIL BAKA
            </button>
          </div>
        ) : null}
      </div>
      <FooterStore />
    </div>
  );
}
