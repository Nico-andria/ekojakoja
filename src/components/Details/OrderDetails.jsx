import React from "react";
import styles from "../../assets/css/TrackingScreen.module.css";
import suivi from "../../assets/Icones/Icon_Clipboard_Desktop_Tablette.png";
import search from "../../assets/Icones/Icon_Search_Desk_Mobil.png";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();

  // Extrayez les données passées via navigate
  const { data } = location.state || {};

  //   console.log(data.length);

  // Extrayez les valeurs nécessaires (pseudo, nombreColis, etc.)
  const pseudo = data[0]?.Pseudo || "Non disponible";
  const nombreColis = data.length || "Non disponible";
  return (
    <div className={styles.orderDetails}>
      <div className={styles.orderHeader}>
        <img src={suivi} alt="" className={styles.orderIcon} />
        <h2 className={styles.orderTitle}>Détails commande</h2>
      </div>

      {data.length > 0 ? (
        <>
          <div className={styles.orderInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Pseudo</span>
              <span className={styles.infoValue}>{pseudo}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Nb colis</span>
              <span className={styles.infoValue}>{nombreColis}</span>
            </div>
          </div>
          <div className={styles.searchOrder}>
            <label htmlFor="orderSearch" className={styles.searchLabel}>
              Recherchez dans votre commande
            </label>
            <div className={styles.searchInputWrapper}>
              <img src={search} alt="" className={styles.searchIcon} />

              <input
                type="text"
                id="orderSearch"
                className={styles.orderSearchInput}
                placeholder="Ex : 78778556280555600"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.noOrder}>
            <p className={styles.noOrderText}>
              Aucune commande trouvée pour ce pseudo
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
