import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import styles from "../styles/HowItWorks.module.css";
import { BsArrowRight } from "react-icons/Bs";
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
                <img className={styles.skref_img} src="skref1.png"></img>
                <p className={styles.skref_p}>
                  Eftir að þú ert búin að skrá þig inn bætir þú við þínum vörum,
                  að hámarki 4 vörur
                </p>
              </div>
              <div className={styles.skref2}>
                <img className={styles.skref_img} src="skref2.png"></img>
                <p className={styles.skref_p}>
                  {" "}
                  Þú ert með yfir sýn yfir allar vörurnar þínar og getur breytt
                  upplýsingum um hverja og eina vöru eða eytt henni{" "}
                </p>
              </div>
              <div className={styles.skref3}>
                <img className={styles.skref_img} src="skref3.png"></img>
                <p className={styles.skref_p}>
                  Þú ert með yfirlit yfir pantanir, vörumagn og alla þína sölu
                  og uppfærist yfirlitið um leið og vara er keypt
                </p>
              </div>
              <div className={styles.skref4}>
                <img className={styles.skref_img} src="skref4.png"></img>
                <p className={styles.skref_p}>
                  Þegar þú hefur bætti við vörum ertu komn með þína eigin
                  netverlsun og getur byrjað að selja strax
                </p>
              </div>
            </div>
          </div>

          <p className={styles.scroll_text}>
            Skrollaðu til hliðar til að sjá næstu mynd{" "}
            <BsArrowRight className={styles.arrow_icon} />
          </p>
        </div>
      </>
      <Footer />
    </>
  );
}
