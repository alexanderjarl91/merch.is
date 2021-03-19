import styles from "../../styles/Dashboard.module.css";
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
  const [productImage, setProductImage] = useState("");

  const addProduct = async () => {

    //get the image and upload it to storage/useremail/productname/img.png
    const handleUpload = () => {
      const uploadTask = storage
      .ref(`${userData.email}/${productName}/${image.name}`)
      .put(image)
      
      //get the URL for the uploaded imgand set the productImage as that URL
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
               setProductImage(url)
               console.log(url)
              console.log(productImage)
            });
        }
      );
    }

    await handleUpload()
    
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

  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  return (
    <div className={styles.component_container}>
      <h1> Bæta við vöru</h1>
      <div>
        <div>
          <input type="file" onChange={handleChange}/>
        </div>
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
