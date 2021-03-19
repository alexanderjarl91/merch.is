import styles from "../../styles/Dashboard/Add.module.css";
import { db, storage } from "../../pages/fire";
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

  const addProduct = async () => {
    //get the image and upload it to storage/useremail/productname/img.pn
    const uploadTask = storage
      .ref(`${userData.email}/${productName}/${image.name}`)
      .put(image);

    //get the URL for the uploaded img and set the productImage as that URL
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
            console.log("url:", url);

            addProductToFirestore(url);
          });
      }
    );

    const addProductToFirestore = async (url) => {
      //defining product
      const product = {
        productName: productName,
        productPrice: productPrice,
        productId: productId,
        productDescription: productDescription,
        productStock: productStock,
        productImg: url,
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
  };

  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className={styles.component_container}>
      <p className={styles.title}> Bæta við vöru</p>

      <div className={styles.add_grid}>
        <div>
          <label className={styles.add_label}>Vöruheiti</label>
          <input
            className={styles.add_input}
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className={styles.add_label}>Verð</label>
          <input
            className={styles.add_input}
            type="number"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label className={styles.add_label}>Vörunúmer (ID)</label>
          <input
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
            className={styles.add_input}
            rows="5"
            type="text"
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
        </div>

        <div className={styles.seccond_grid}>
          <label className={styles.add_label}>Bæta við mynd af vörunni </label>
          <input
            className={styles.add_file}
            type="file"
            onChange={handleChange}
          />

          <p style={{ color: "red" }}>ERROR</p>
          <p>ATH: Vara er sýnileg á sölusíðunni þinni um leið og þú birtir </p>
          <button
            className={styles.add_button}
            onClick={() => {
              addProduct();
            }}
          >
            Bæta við vöru
          </button>
        </div>
      </div>
    </div>
  );
}
