import React, { useState } from "react";
import styles from "../../assets/css/TrackingScreen.module.css";
import { useLocation } from "react-router-dom";
import "../../assets/css/TimelineEvent.css";
import suivi from "../../assets/Icones/Icon_Clipboard_Desktop_Tablette.png";
import search from "../../assets/Icones/Icon_Search_Desk_Mobil.png";
import { DateTime } from "luxon";
import VerticalProgress from "./VerticalProgress";
import up from "../../assets/Icones/Icon_up.png";
import down from "../../assets/Icones/Icon_down.png";

const Track = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const [searchItem, setSearchItem] = useState("");
  const [activeTracking, setActiveTracking] = useState(null);

  const handleSearchTerm = (e) => {
    setSearchItem(e.target.value);
  };

  const toggleAccordion = (trackingNumber) => {
    setActiveTracking(
      activeTracking === trackingNumber ? null : trackingNumber
    );
  };

  // Extrayez les valeurs nécessaires
  const pseudo = data[0]?.Pseudo || "Non disponible";
  const nombreColis = data.length || "Non disponible";

  return (
    <div className={styles.trackingTimeline}>
      {/* OrderDetails - Maintenu identique */}
      {data.length > 2 && (
        <div className={styles.orderDetails}>
          <div className={styles.orderHeader}>
            <img src={suivi} alt="" className={styles.orderIcon} />
            <h2 className={styles.orderTitle}>Détails commande</h2>
          </div>

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
              <div className={styles.searchIconDiv}>
                <img src={search} alt="" className={styles.searchIcon} />
              </div>
              <input
                type="text"
                id="orderSearch"
                className={styles.orderSearchInput}
                placeholder="Ex : 78778556280555600"
                onChange={handleSearchTerm}
              />
            </div>
          </div>
        </div>
      )}

      {/* Nouveau système d'accordéon unifié */}
      <div className={styles.timelineSection}>
        {data
          .filter((item) => item.Tracking.includes(searchItem))
          .map((item, index) => (
            <div
              key={index}
              className={`${styles.accordionItem} ${
                activeTracking === item.Tracking ? styles.active : ""
              }`}
            >
              <button
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(item.Tracking)}
              >
                <div className={styles.trackingNumber}>{item.Tracking}</div>
                <img
                  src={activeTracking === item.Tracking ? up : down}
                  alt={
                    activeTracking === item.Tracking ? "Réduire" : "Développer"
                  }
                  className={styles.accordionIcon}
                />
              </button>

              <div className={styles.accordionContent}>
                <div className={styles.shipmentInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      Date de réception du colis en Chine
                    </span>
                    <span className={styles.infoValue}>
                      {DateTime.fromFormat(item.Réception, "dd/MM/yyyy")
                        .setLocale("fr")
                        .toFormat("cccc d MMMM yyyy")}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      Date d'expédition Chine-Madagascar
                    </span>
                    <span
                      className={`${styles.infoValue} ${
                        item.Départ === "EN ATTENTE" ? styles.infoDepart : ""
                      }`}
                    >
                      {item.Départ === "EN ATTENTE"
                        ? "En attente"
                        : DateTime.fromFormat(item.Départ, "dd/MM/yyyy")
                            .setLocale("fr")
                            .toFormat("cccc d MMMM yyyy")}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Type d'envoi</span>
                    <span className={styles.infoValue}>{item.Envoi}</span>
                  </div>
                  {item.Commentaires && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>
                        Infos sur ce colis
                      </span>
                      <span className={styles.infoValue}>
                        {item.Commentaires}
                      </span>
                    </div>
                  )}

                  {/* <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Tarif</span>
                    <span className={styles.infoValue}>
                      {Number(item.Tarif).toLocaleString("fr-FR")}
                      {!item.Envoi?.includes("Maritime")
                        ? "Ariary / kg"
                        : "$ / m³"}
                    </span>
                  </div> */}
                  <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Tarif</span>
                      <span className={styles.infoValue}>
                        {Number(item.Tarif).toLocaleString("fr-FR")}
                        {!item.Envoi?.includes("Maritime")
                          ? "Ar / kg"
                          : "$ / m³"}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Tarif total</span>
                      <span className={styles.infoValue}>
                        {Number(item.ARIARY).toLocaleString("fr-FR")} Ar
                      </span>
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Volume</span>
                      <span className={styles.infoValue}>
                        {item?.Volume} m³
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Poids</span>
                      <span className={styles.infoValue}>
                        {item?.Poids ? `${item.Poids}kg` : "-"}
                      </span>
                    </div>
                  </div>
                </div>
                <VerticalProgress items={[item]} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Track;
