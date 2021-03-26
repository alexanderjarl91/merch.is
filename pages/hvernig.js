import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import styles from "../styles/HowItWorks.module.css";
export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>merch.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <div className="content">
          <Navbar />
          <div className={styles.container}>
            <div className={styles.main_grid}>
              <div className={styles.skref1}>
                <h2>Uppfæra búðarupplýsingar</h2>
                <img className={styles.skref_img} src="skref1.png"></img>
                <p className={styles.skref_p}>
                  Eftir að þú ert búin/nn að skrá þig inn getur þú farið í
                  stillingar og hlaðið upp logo-inu þínu (og breytt öðrum
                  upplýsingum um þína búð)
                </p>
              </div>
              <div className={styles.skref2}>
                <h2>Breyta og eyða vörum</h2>
                <img className={styles.skref_img} src="skref2.png"></img>
                <p className={styles.skref_p}>
                  {" "}
                  Í <strong>mínar vörur</strong> ert þú með yfirsýn yfir allar
                  vörurnar þínar og getur breytt upplýsingum um hverja og eina
                  vöru eða eytt þeim út. Athugaðu að allar breytingar eru birtar
                  samstundis í búðinni þinni.{" "}
                </p>
              </div>
              <div className={styles.skref3}>
                <h2>Yfirlitið</h2>
                <img className={styles.skref_img} src="skref3.png"></img>
                <p className={styles.skref_p}>
                  í <strong>Yfirlit</strong> ert þú með yfirlit yfir pantanir,
                  vörumagn og alla þína sölu og uppfærist yfirlitið í rauntíma
                  um leið og vara er keypt.
                </p>
              </div>
              <div className={styles.skref4}>
                <h2>Búðin þín</h2>
                <img className={styles.skref_img} src="skref4.png"></img>
                <p className={styles.skref_p}>
                  Um leið og þú hefur klárað nýskráningu ertu strax komin með
                  þína eigin netverlsun aðgengilega á hlekknum sem þú valdir þér
                  og getur byrjað að selja um leið og þú hefur bætt við vörum.
                </p>
              </div>
            </div>
          </div>

          <p className={styles.scroll_text}>
            Skrollaðu til hægri til að sjá næstu mynd{" "}
          </p>
        </div>
      </>
      <Footer />
    </>
  );
}
