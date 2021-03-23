import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UsersContext } from "../../context";
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
      {store ? (
        <>
          <div className={styles.container}>
            <img className={styles.store_img} src={store.logo} />
            <h2 className={styles.store_title}>{storeOwner.store.name}</h2>
            <p className={styles.store_social}>{store.social}</p>
            <p className={styles.store_bio}>{store.bio}</p>

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
              DEILA SÍÐU
            </button>
            {showShare ? (
              <div className={styles.share_buttons}>
                <FacebookShareButton
                  quote="TESTING"
                  hashtag="#merch.is"
                  url={`ourlink.com/${storeNameQuery}`}
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
                  url={`ourlink.com/${storeNameQuery}`}
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
