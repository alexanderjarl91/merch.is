import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Link } from "next/Link";

import { UsersContext } from "../../pages/context";
import Footer from "../../components/Footer";

import styles from "../../styles/Product.module.css"

export default function Product() {
  const router = useRouter();
  const { userData, users } = useContext(UsersContext);
  const storeOwner = users.find((x) => x.store.url == router.query.store);
  const productId = router.query.product;

  const product = storeOwner
    ? storeOwner.products.find((x) => x.productId == productId)
    : null;
  
  const back = () => {
      router.push(`/${router.query.store}`)
  }

  return (
    <div className={styles.product_page}>
      <h1 className={styles.logo}>merch.</h1>
      <button onClick={()=>{
          back()
      }}></button>
      {storeOwner ? (
        <div className={styles.container}>
            <div className="productPage_header">
                <img className={styles.store_logo}src={storeOwner.store.logo}/>
                <p className={styles.store_social}>{storeOwner.store.social}</p>
            </div>
            <div className={styles.product}>
                <div className={styles.product_images}>

                    <div className={styles.product_smallImages}>
                        <img className={styles.product_smallImg} src="https://images-na.ssl-images-amazon.com/images/I/81Af8as1z7L._AC_UL1500_.jpg" alt=""/>
                        <img className={styles.product_smallImg} src="https://images-na.ssl-images-amazon.com/images/I/81Af8as1z7L._AC_UL1500_.jpg" alt=""/>
                        <img className={styles.product_smallImg} src="https://images-na.ssl-images-amazon.com/images/I/81Af8as1z7L._AC_UL1500_.jpg" alt=""/>

                    </div>
                    <img  className={styles.product_mainImg} src={product.productImg} alt=""/>
                </div>
                <div className={styles.product_info}>
                    <h1 className={styles.product_name}>{product.productName}</h1>
                    <p className={styles.product_description}>{product.productDescription}</p>
                    <div className={styles.product_footer}>
                        <h1 className={styles.product_price}>{product.productPrice} ISK</h1>
                        <button>Kaupa</button>
                    </div>
                </div>


            </div>
        </div>

      ) : null}
      <Footer />
    </div>
  );
}
