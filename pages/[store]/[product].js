import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "../../pages/context";
import FooterStore from "../../components/store/FooterStore";
import styles from "../../styles/Store/Product.module.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { db } from "../fire";

export default function Product() {
  const router = useRouter();
  const { users, getUsers } = useContext(UsersContext);
  // const storeOwner = users.find((x) => x.store.url == router.query.store);
  const productId = router.query.product;
  const [storeOwner, setStoreOwner] = useState();

  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const product = storeOwner
    ? storeOwner.products.find((x) => x.productId == productId)
    : null;

  const back = () => {
    router.push(`/${router.query.store}`);
  };

  const [showShare, setShowShare] = useState(false);
  const toggleShare = () => {
    setShowShare(!showShare);
  };

  //setting new store owner data every time users changes
  useEffect(() => {
    const findOwner = users.find((x) => x.store.url == router.query.store);
    setStoreOwner(findOwner);
  }, [users]);
  console.log(storeOwner);

  const purchaseItem = async () => {
    //renewing users data every time
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

    const ordersCopy = storeOwner.orders;
    const updatedOrders = [...ordersCopy, order];

    db.collection("users")
      .doc(storeOwner.email)
      .update({ orders: updatedOrders })
      .then(() => {
        setOrderSuccessful(true);
      });
  };

  return (
    <div className={styles.product_page}>
      {storeOwner ? (
        <div className={styles.container}>
          <div className="productPage_header">
            <img className={styles.store_logo} src={storeOwner.store.logo} />
            <p className={styles.store_social}>{storeOwner.store.social}</p>
          </div>
          <div className={styles.product}>
            <div className={styles.product_images}>
              <div className={styles.product_smallImages}>
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
              </div>
              <img
                className={styles.product_mainImg}
                src={product.productImg}
                alt=""
              />
            </div>
            <div className={styles.product_info}>
              <h1 className={styles.product_name}>{product.productName}</h1>
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
                    url={`ourlink.com/`}
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
            FARA TILBAKA
          </button>
        </div>
      ) : null}
      <FooterStore />
    </div>
  );
}
