import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "../../context";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Store/Store.module.css";
import FooterStore from "../../components/store/FooterStore";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";

const Store = ({ products }) => {
  const router = useRouter();
  const { users, getUsers } = useContext(UsersContext);
  const storeNameQuery = router.query ? router.query.store : null;
  const storeOwner = users.find((x) => x.store.url == storeNameQuery);
  const store = storeOwner ? storeOwner.store : null;

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (storeNameQuery && !storeOwner) {
      router.push("/404");
    }
  }, [users]);

  console.log(products);

  const [showShare, setShowShare] = useState(false);
  const toggleShare = () => {
    setShowShare(!showShare);
  };

  return (
    <div>
      <Head>
        <title>{`${storeNameQuery}`} | merch.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {store ? (
        <>
          <div className={styles.container}>
            <div className={styles.user_info_box}>
              <img className={styles.store_img} src={store.logo} />
              <h2 className={styles.store_title}>{storeOwner.store.name}</h2>
              <a
                href={`https://${storeOwner.store.social}`}
                className={styles.store_social}
              >
                {store.social}
              </a>
              <p className={styles.store_bio}>{store.bio}</p>
            </div>

            <div className={styles.grid}>
              {storeOwner.products.map((product) => {
                console.log("product");
                return (
                  <Link
                    href={`/${storeNameQuery}/${product.productId}`}
                    key={product.productImg}
                  >
                    <div className={styles.product}>
                      <img
                        className={styles.product_img}
                        src={product.productImg}
                      />
                      <p className={styles.product_name}>
                        {product.productName}
                      </p>
                      <p className={styles.product_price}>
                        {product.productPrice} ISK
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <button onClick={toggleShare} className={styles.share_button}>
              DEILA S????U
            </button>

            {showShare ? (
              <div className={styles.share_buttons}>
                <FacebookShareButton
                  hashtag="#merch.is"
                  url={`https://merch-is.vercel.app/${storeOwner.store.url}`}
                >
                  <FacebookIcon
                    logoFillColor="white"
                    round={true}
                    width="35px"
                  />
                </FacebookShareButton>
                <TwitterShareButton
                  title={`K??ki?? ?? v??ru??rvali?? hj?? ${storeOwner.store.name}!`}
                  via="merch_is"
                  url={`https://merch-is.vercel.app/${storeNameQuery}`}
                >
                  <TwitterIcon
                    logoFillColor="white"
                    round={true}
                    width="35px"
                  />
                </TwitterShareButton>
                <WhatsappShareButton
                  hashtag="#merch.is"
                  url={`https://merch-is.vercel.app/${storeNameQuery}`}
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
          <FooterStore />
        </>
      ) : null}
    </div>
  );
};
export default Store;
