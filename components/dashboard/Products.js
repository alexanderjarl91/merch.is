import styles from "../../styles/Dashboard/Products.module.css";
import { db } from "../../pages/fire";
import { UsersContext } from "../../pages/context";
import React, { useContext, useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import ReactModal from "react-modal";
import EditModal from "./EditModal";

export default function Products({ setComponentShowing, componentShowing }) {
  const { userData, refreshUserData } = useContext(UsersContext);
  const [productToEdit, setProductToEdit] = useState([]);

  //refresh data when component mounts
  useEffect(() => {
    refreshUserData();
  }, []);

  //HANDLE DELETE
  const handleDelete = async (productId) => {
    //filter out the clicked item
    const firestoreUser = await db.collection("users").doc(userData.email);
    const userSnapshot = await db.collection("users").doc(userData.email).get();
    const productsCopy = userSnapshot.data().products;
    const filteredProducts = productsCopy.filter(
      (product) => product.productId !== productId
    );
    //update firestore with new products array
    await firestoreUser
      .update({
        products: filteredProducts,
      })
      .then(refreshUserData);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
    console.log("modal toggled");
  };

  const [productIndex, setProductIndex] = useState();

  return (
    <div className={styles.component_container}>
      <p className={styles.title}> Mínar vörur </p>

      <div className={styles.header_box}>
        <p>Mynd</p>

        <p>Vöruheiti</p>
        <p>Verð</p>
        <p>Vörunúmer</p>
      </div>

      {userData.products.map((product, index) => {
        return (
          <div key={product.productId} className={styles.product}>
            <div className={styles.each_product}>
              <div className={styles.grid_item}>
                <img className={styles.product_img} src={product.productImg} />
              </div>

              <div className={styles.product_name}>
                <p> {product.productName}</p>
              </div>

              <div className={styles.product_price}>
                <p> {product.productPrice} KR</p>
              </div>

              <div className={styles.product_id}>
                <p> ID: {product.productId}</p>
              </div>

              <button
                onClick={() => {
                  //find products index and set it to a state, then pass state to modal component
                  const products = userData.products;
                  const index = products.findIndex(
                    (item) => item.productId === product.productId
                  );
                  setProductIndex(index);
                  toggleModal();
                }}
                className={styles.product_button_edit}
              >
                Breyta
              </button>

              <button
                className={styles.product_button_delete}
                onClick={() => {
                  const productId = product.productId;
                  const r = confirm(
                    "Ertu viss um að þú viljir eyða þessari vöru?"
                  );
                  if (r == true) {
                    handleDelete(productId);
                  } else {
                    return;
                  }
                }}
              >
                {" "}
                <AiTwotoneDelete className={styles.product_button_delete} />
              </button>
            </div>

            {/*  EDIT PRODUCT MODAL */}
            <ReactModal
              style={{
                position: "absolute",
                overlay: { zIndex: 1000 },
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  minHeight: "500px",
                  minWidth: "800px",
                },
              }}
              isOpen={modalOpen}
            >
              {/* rendering modal component with products index as props */}
              <EditModal
                productIndex={productIndex}
                toggleModal={toggleModal}
              />

              <button
                onClick={() => {
                  toggleModal();
                }}
                className={styles.product_button_edit}
              >
                Hætta
              </button>
            </ReactModal>
          </div>
        );
      })}
    </div>
  );
}
