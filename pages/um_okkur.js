import React from "react";
import styles from "../styles/Um_okkur.module.css";

function um_okkur() {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.umOkkur}>UM OKKUR</p>
        <p className={styles.aukaP}>Hér getur komið stutt setning um okkur</p>
        <div className={styles.umOkkurTexti}>
          <p>
            {" "}
            Og hér getur verið lengri texti um okkur.. adipiscing elit. Id sit
            magna enim lectus sed pellentesque arcu. Mi aliquam dui quis sed
            leo. Et sed donec dolor, tellus. Tristique sagittis vitae
            pellentesque in vivamus iaculis feugiat. Justo id nulla sagittis
            egestas amet commodo, nisl{" "}
          </p>
          <p>
            tristique fermentum. Lacus tristique fermentum in imperdiet
            convallis nibh eget. Diam felis, felis mi ligula ante eget. Bibendum
            non venenatis amet adipiscing auctor
          </p>
        </div>
      </div>
    </>
  );
}

export default um_okkur;
