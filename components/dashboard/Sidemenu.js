import React, { useState } from "react";

export default function Sidemenu({ componentShowing, setComponentShowing }) {
  return (
    <>
      <button
        onClick={() => {
          setComponentShowing("products");
          console.log(componentShowing);
        }}
      >
        {" "}
        products{" "}
      </button>
      <button
        onClick={() => {
          setComponentShowing("add");
          console.log(componentShowing);
        }}
      >
        {" "}
        Bæta við vöru{" "}
      </button>
    </>
  );
}
