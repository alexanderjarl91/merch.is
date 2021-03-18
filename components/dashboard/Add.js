import styles from "../../styles/Dashboard.module.css";
import { db } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useState, useContext } from "react";

export default function Add({ setComponentShowing }) {
  //data from context
  const { userData } = useContext(UsersContext);

  //product data states
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productId, setProductId] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStock, setProductStock] = useState();
  const [productImage, setProductImage] = useState("");

  const addProduct = async () => {
    //defining product
    const product = {
      productName: productName,
      productPrice: productPrice,
      productId: productId,
      productDescription: productDescription,
      productStock: productStock,
      productImage: productImage,
    };

    //creating copy of array and adding new item to it
    const user = await db.collection("users").doc(userData.email).get();
    const productsCopy = user.data().products;
    const newProducts = [...productsCopy, product];

    //if user has to many products then return, else push to database & go to products component
    if (productsCopy.length > 3) {
      alert("too many products");
    } else {
      db.collection("users")
        .doc(userData.email)
        .update({ products: newProducts });
      setComponentShowing("products");
    }
  };

  return (
    <div className={styles.component_container}>
      <h1> Bæta við vöru</h1>
      <div>
        <div>
          <label>Vöruheiti</label>
          <input
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Verð</label>
          <input
            type="number"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Vörunúmer (ID)</label>
          <input
            type="text"
            onChange={(e) => {
              setProductId(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Vörulýsing</label>
          <textarea
            type="text"
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Magn á lager</label>
          <input
            type="number"
            onChange={(e) => {
              setProductStock(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Hlekkur á mynd</label>
          <input
            type="text"
            onChange={(e) => {
              setProductImage(e.target.value);
            }}
          />
        </div>
        <input type="file" id="myFile" name="filename" />
      </div>
      <p>ATH: Vara er sýnileg á sölusíðunni þinni um leið og þú birtir </p>
      <a
        onClick={() => {
          addProduct();
        }}
      >
        Bæta við vöru
      </a>
    </div>
  );
  // return <p> {userData.products[0].productDescription} </p>;
}
