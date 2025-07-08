import React, { useState, useEffect } from "react";
import styles from "../../assets/css/TrackingScreen.module.css";
import suivi from "../../assets/Icones/Icon_Clipboard_Desktop_Tablette.png";
import search from "../../assets/Icones/Icon_Search_Desk_Mobil.png";

const OrderDetailss = ({ data, onSearchResults }) => {
  const pseudo = data[0]?.Pseudo || "Non disponible";
  const nombreColis = data.length || "Non disponible";

  // État pour l'entrée de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // Gestion du changement de l'entrée de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrez les résultats en fonction de l'entrée de recherche
  const filteredData = data.filter((item) =>
    item.Tracking.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Appeler la fonction de callback pour transmettre les résultats filtrés
  useEffect(() => {
    onSearchResults(filteredData);
  }, [filteredData, onSearchResults]);

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
            {/* Champ recherche */}
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
                onChange={handleSearchChange} // Mettez à jour l'état de recherche
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

export default OrderDetailss;
