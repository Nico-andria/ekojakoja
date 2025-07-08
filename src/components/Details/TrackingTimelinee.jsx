import React, { useState } from "react";
import styles from "../../assets/css/TrackingScreen.module.css";
import { useLocation } from "react-router-dom";
import "../../assets/css/TimelineEvent.css";
// import "../../assets/css/VerticalProgress.css";

import suivi from "../../assets/Icones/Icon_Clipboard_Desktop_Tablette.png";
import search from "../../assets/Icones/Icon_Search_Desk_Mobil.png";

import { DateTime } from "luxon";
import VerticalProgress from "./VerticalProgress";
import Faq from "./Faq";

const TrackingTimeline = () => {
  const location = useLocation();
  const { data } = location.state || {};

  // État pour stocker le TrackingNumber sélectionné
  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState(null);

  // Fonction pour gérer la sélection d'un TrackingNumber
  const handleTrackingNumberClick = (trackingNumber) => {
    setSelectedTrackingNumber(
      selectedTrackingNumber === trackingNumber ? null : trackingNumber
    );
  };

  // Filtrer les données pour ne garder que celles correspondant au TrackingNumber sélectionné
  const filteredData = selectedTrackingNumber
    ? data.filter((item) => item.Tracking === selectedTrackingNumber)
    : [];

  // Extrayez les valeurs nécessaires (pseudo, nombreColis, etc.)
  const pseudo = data[0]?.Pseudo || "Non disponible";
  const nombreColis = data.length || "Non disponible";

  const [searchItem, setSearchItem] = useState("");

  const handleSearchTerm = (e) => {
    let value = e.target.value;
    setSearchItem(value);
  };

  return (
    <div className={styles.trackingTimeline}>
      {/* OrderDetails */}
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
              <img src={search} alt="" className={styles.searchIcon} />
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

      <Faq />

      {/* Afficher la liste des TrackingNumbers */}
      {data
        .filter((item) => {
          return item.Tracking.includes(searchItem);
        })
        .map((item, index) => (
          <div key={index} className={styles.timelineSection}>
            <div
              className={styles.timelineHeader}
              onClick={() => handleTrackingNumberClick(item.Tracking)}
            >
              <div className={styles.trackingNumber}>
                {item.Tracking}{" "}
                {/* <span className={styles.colisCount}>{item.colisCount}</span> */}
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/6fd89aac11cf475281a5c0287ada72e5/3c221fef249067cefbf0d5bed4cf2028c63171fb7d2c5fb5e4e745c21410ec3a?apiKey=6fd89aac11cf475281a5c0287ada72e5&"
                alt=""
                className={styles.expandIcon}
              />
            </div>

            {/* Afficher les détails uniquement pour le TrackingNumber sélectionné */}
            {selectedTrackingNumber === item.Tracking && (
              <div className={styles.timelineDetails}>
                <div className={styles.shipmentInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      Date de réception du colis en Chine
                    </span>
                    <span className={styles.infoValue}>
                      {DateTime.fromFormat(item.Réception, "dd/MM/yyyy")
                        .setLocale("fr") // Définir la localisation en français
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
                            .setLocale("fr") // Définir la localisation en français
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

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Tarif</span>
                    <span className={styles.infoValue}>
                      {Number(item.Tarif).toLocaleString("fr-FR")}
                      {!item.Envoi?.includes("Maritime")
                        ? "Ariary / kg"
                        : "$ / m3"}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Volume</span>
                      <span className={styles.infoValue}>
                        {item?.Volume} m3
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Poids</span>
                      <span className={styles.infoValue}>{item?.Poids} kg</span>
                    </div>
                  </div>
                </div>

                <VerticalProgress items={filteredData} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default TrackingTimeline;
