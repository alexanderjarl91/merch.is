import React, { useState, useContext } from "react";
import styles from "../../styles/Dashboard/Add.module.css";
import { UsersContext } from "../../context";
import { db, auth, storage } from "../../fire";

export default function EditModal({ productIndex, toggleModal }) {
  const { userData } = useContext(UsersContext);

  //currently editing product:
  const product = userData.products[productIndex];

  //product data states
  const [productName, setProductName] = useState(product.productName);
  const [productPrice, setProductPrice] = useState(product.productPrice);
  const [productId, setProductId] = useState(product.productId);
  const [productDescription, setProductDescription] = useState(
    product.productDescription
  );
  const [productStock, setProductStock] = useState(product.productStock);
  const [image, setImage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const updateStorage = () => {
    //form validation
    if (productName.length == 0) {
      setErrorMessage("Vara verður að hafa vöruheiti");
      return;
    }
    if (!productPrice || productPrice == 0) {
      setErrorMessage("Verð verður að vera hærra en 0");
      return;
    }
    if (productId.length == 0) {
      setErrorMessage("Allar vörur verða að hafa vörunúmer");
      return;
    }

    // validation passed, clear errors
    setErrorMessage();

    //if no image was uploaded, use the old one
    if (!image) {
      let url = userData.products[productIndex].productImg;
      updateProduct(url);
      console.log("NO IMAGE UPLOADED..");
      return;
    }

    const uploadTask = storage
      .ref(`${userData.email}/${productName}/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(userData.email)
          .child(productName)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            updateProduct(url);
            return;
          });
      }
    );
  };
  const updateProduct = async (url) => {
    const newProduct = {
      productName: productName,
      productPrice: productPrice,
      productId: productId,
      productDescription: productDescription,
      productStock: productStock,
      productImg: url,
    };

    const userRef = db.collection("users").doc(auth.currentUser.email);
    let products = [...userData.products];
    products.splice(productIndex, 1);
    products = [newProduct, ...products];

    userRef.update({ products: products }).then(() => {
      toggleModal();
    });
  };

  return (
    <div>
      <div className={styles.add_grid}>
        <h1>Breyta vöru</h1>
        <div>
          <label className={styles.add_label}>Vöruheiti*</label>
          <input
            placeholder={product.productName}
            className={styles.add_input}
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className={styles.add_label}>Verð*</label>
          <input
            placeholder={product.productPrice}
            className={styles.add_input}
            type="number"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label className={styles.add_label}>Vörunúmer (ID)*</label>
          <input
            placeholder={product.productId}
            className={styles.add_input}
            type="text"
            onChange={(e) => {
              setProductId(e.target.value);
            }}
          />
        </div>
        <div>
          <label className={styles.add_label}>Magn á lager</label>
          <input
            placeholder={product.productStock}
            className={styles.add_input}
            type="number"
            onChange={(e) => {
              setProductStock(e.target.value);
            }}
          />
        </div>
        <div>
          <label className={styles.add_label}>Vörulýsing</label>
          <textarea
            placeholder={product.productDescription}
            className={styles.add_input}
            rows="5"
            type="text"
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
        </div>

        <div className={styles.seccond_grid}>
          <label className={styles.add_label}>Bæta við mynd af vörunni*</label>
          <input
            id="img"
            className={styles.add_file}
            type="file"
            accept="image/*"
            onChange={handleChange}
          />

          <p>
            ATH: Breytingarnar eru sýnilegar á sölusíðunni þinni um leið og þú
            vistar
          </p>

          {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}

          <button
            className={styles.add_button}
            onClick={() => {
              updateStorage();
            }}
          >
            Vista
          </button>
        </div>
      </div>
    </div>
  );
}
