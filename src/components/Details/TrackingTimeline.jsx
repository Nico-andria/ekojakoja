import React, { useState } from "react";
import styles from "../../assets/css/TrackingScreen.module.css";
import { useLocation } from "react-router-dom";
import "../../assets/css/TimelineEvent.css";

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

  return (
    <div className={styles.trackingTimeline}>
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
                <span className={styles.infoValue}>{data.pseudo}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nb colis</span>
                <span className={styles.infoValue}>{data.nombreColis}</span>
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
                  value={searchTerm} // Liaison avec l'état de recherche
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noOrder}>
            <p className={styles.noOrderText}>
              Aucune commande trouvée pour ce pseudo
            </p>
          </div>
        )}
      </div>
      {/* Afficher la liste des TrackingNumbers */}
      {data.map((item, index) => (
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
                  <span className={styles.infoValue}>{item.Réception}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    Date d'expédition Chine-Madagascar
                  </span>
                  <span className={styles.infoValue}>{item.Départ}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Type d'envoi</span>
                  <span className={styles.infoValue}>{item.Envoi}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    Nombres de colis pour ce numéro
                  </span>
                  <span className={styles.infoValue}>10</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Tarif</span>
                  <span className={styles.infoValue}>{item.Tarif} $ /m3</span>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Volume</span>
                    <span className={styles.infoValue}>{item?.Volume} m3</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Poids</span>
                    <span className={styles.infoValue}>{item?.Poids} kg</span>
                  </div>
                </div>
              </div>

              {/* Afficher la timeline correspondante */}
              <div className={styles.timeline}>
                {filteredData.map((item, index) => (
                  <div className="progression" key={index}>
                    <ul>
                      <li>
                        {" "}
                        <i className="icon uil uil-yen-circle"></i>
                        <div
                          className={`progress one ${
                            item.Statut == "ACHAT EFFECTUE" ||
                            item.Statut == "ENTREPOT CHINE" ||
                            item.Statut == "EN TRANSIT" ||
                            item.Statut == "EN DOUANE MDG" ||
                            item.Statut == "ARRIVEE A MDG"
                              ? "active"
                              : ""
                          }`}
                        >
                          <p>1</p>
                          <i className="uil uil-check"></i>
                        </div>
                        <p className="text">Achat effectué</p>
                      </li>

                      <li>
                        <i className="icon uil uil-clipboard-notes"></i>
                        <div
                          className={`progress two ${
                            item.Statut == "ENTREPOT CHINE" ||
                            item.Statut == "EN TRANSIT" ||
                            item.Statut == "EN DOUANE MDG" ||
                            item.Statut == "ARRIVEE A MDG"
                              ? "active"
                              : ""
                          }`}
                        >
                          <p>2</p>
                          <i className="uil uil-check"></i>
                        </div>
                        <p className="text">Arrivé à l'entrepôt en Chine</p>
                      </li>

                      <li>
                        <i
                          className={`icon ${
                            item.Envoi.includes("Maritime")
                              ? "uil-ship"
                              : "uil-plane"
                          }`}
                        ></i>
                        <div
                          className={`progress two ${
                            (item.Statut == "EN TRANSIT" ||
                              item.Statut == "EN DOUANE MDG" ||
                              item.Statut == "ARRIVEE A MDG") &&
                            "active"
                          }`}
                        >
                          <p>3</p>
                          <i className="uil uil-check"></i>
                        </div>
                        <p className="text">En transit vers Madagascar</p>
                      </li>

                      {item.Envoi.includes("Maritime") ? (
                        <li>
                          <i
                            className={`icon ${
                              item.Envoi.includes("Maritime")
                                ? "uil-store-alt"
                                : "uil-plane"
                            }`}
                          ></i>
                          <div
                            className={`progress three ${
                              (item.Statut == "EN DOUANE MDG" ||
                                item.Statut == "ARRIVEE A MDG") &&
                              "active"
                            }`}
                          >
                            <p>{item.Envoi.includes("Maritime") ? "4" : "3"}</p>
                            <i className="uil uil-check"></i>
                          </div>
                          <p className="text">En Douane à Madagascar</p>
                        </li>
                      ) : (
                        ""
                      )}

                      <li>
                        <i
                          className="icon uil uil-map-marker"
                          style={{
                            color: `${
                              item.Statut == "ARRIVEE A MDG" ? "#4caf50" : ""
                            }`,
                          }}
                        ></i>
                        <div
                          className={`progress ${
                            item.Envoi.includes("Maritime") && "four"
                          } three ${
                            item.Statut == "ARRIVEE A MDG" && "active"
                          }`}
                        >
                          <p>{item.Envoi.includes("Maritime") ? "5" : "4"}</p>
                          <i className="uil uil-check"></i>
                        </div>
                        <p
                          className="text"
                          style={{
                            color: `${
                              item.Statut == "ARRIVEE A MDG" ? "#4caf50" : ""
                            }`,
                          }}
                        >
                          Colis arrivé
                        </p>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
