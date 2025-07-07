import React from "react";
import { useEffect, useState } from "react";
import "../App.css";
import moment from "moment";
import "moment/locale/fr";
import logoLong from "./assets/logo_long.png";
import logo from "./assets/logo.png";

// Configurer Moment.js pour utiliser la locale française
moment.locale("fr");

const TrackingScreen = () => {
  // État pour stocker la valeur de l'input
  const [inputValue, setInputValue] = useState("");

  // État pour stocker le type de paramètre sélectionné
  const [paramType, setParamType] = useState("tracking");

  // État pour stocker les données récupérées
  const [data, setData] = useState(null);

  // État pour gérer les erreurs
  const [error, setError] = useState(null);

  // État pour gérer le chargement
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Exemple de date à formater
    const date = "27/04/2024";

    // Formater la date avec le format "DD/MM/YYYY"
    const formattedDate = moment(date, "DD/MM/YYYY").format(
      "dddd Do MMMM YYYY"
    );

    // Afficher la date formatée dans la console
    console.log(formattedDate);

    // Fonction de nettoyage vide (pas nécessaire ici mais peut être utilisé pour nettoyer les effets secondaires)
    return () => {};
  }, []);

  // Fonction pour récupérer les données
  const fetchData = (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Construire l'URL en fonction du type de paramètre sélectionné (DEV)
    // const url = `https://sheetdb.io/api/v1/qms48o92dvn20/search?${paramType}=${encodeURIComponent(
    //   inputValue
    // )}`;

    // Construire l'URL en fonction du type de paramètre sélectionné (PROD)
    const url = `https://sheetdb.io/api/v1/z7nk370ysakmz/search?${paramType}=${encodeURIComponent(
      inputValue
    )}`;

    setLoading(true); // Démarre le chargement
    setError(null);
    setData(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        setData(res); // Met à jour l'état avec les données récupérées
        setLoading(false); // Arrête le chargement
      })
      .catch((error) => {
        setError(error.message); // Met à jour l'état des erreurs
        setData(null); // Réinitialise les données en cas d'erreur
        setLoading(false); // Arrête le chargement
      });
  };
  // Fonction pour mettre à jour l'état lorsque l'input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Fonction pour mettre à jour le type de paramètre sélectionné
  const handleParamTypeChange = (event) => {
    setParamType(event.target.value);
  };
  return (
    <div className="main">
      <div className="container">
        <div className="head">
          <p className="head_1">Service de tracking </p>
          <img src={logoLong} width={"200px"} alt="logo" />
        </div>

        <div className="formulaire">
          <form onSubmit={fetchData}>
            <label htmlFor="trackingNumber">
              Écrivez votre tracking Number
            </label>
            <br />
            <select
              id="paramType"
              value={paramType}
              onChange={handleParamTypeChange}
            >
              <option value="Tracking">Tracking Number</option>
              <option value="Pseudo">Pseudo</option>
              {/* Ajoutez d'autres options ici si nécessaire */}
            </select>
            <input
              type="text"
              placeholder="Entrez la valeur..."
              id="inputValue"
              value={inputValue}
              onChange={handleInputChange}
            />
            {loading ? (
              <button type="button" disabled>
                Chargement...
              </button>
            ) : (
              <button type="submit">Rechercher</button>
            )}
          </form>
        </div>

        {error && <p className="error">Erreur: {error}</p>}
        {loading && (
          <>
            <div className="loading">
              <img src={logo} alt="Chargement..." width={"200px"} />
            </div>
          </>
        )}

        {/* Affichage des résultats si data est disponible */}
        {data && data.length > 0 && (
          <>
            <div className="info">
              <table
                style={{
                  color: "white",
                  paddingTop: "50px",
                }}
              >
                {data.map((item) => (
                  <>
                    <tr>
                      <td style={{ color: "#ff4732" }}>Tracking Number</td>
                      <td>: {item.Tracking}</td>
                    </tr>

                    <tr>
                      <td style={{ color: "#ff4732" }}>Date de départ</td>
                      <td>: {item.Départ}</td>
                    </tr>

                    <tr>
                      <td style={{ color: "#ff4732" }}>Type d&apos;envoi</td>
                      <td>: {item.Envoi}</td>
                    </tr>

                    <tr>
                      <td style={{ color: "#ff4732" }}>Date d&apos;arrivée</td>
                      <td>: {item.Réception}</td>
                    </tr>

                    <tr>
                      <td style={{ color: "#ff4732" }}>Tarif</td>
                      <td>
                        : {item.Tarif}{" "}
                        <span>
                          {item.Envoi !== "Maritime" ? "Ariary / kg" : "$ / m3"}
                        </span>
                      </td>
                    </tr>

                    {item.Envoi == "Maritime" ? (
                      <tr>
                        <td style={{ color: "#ff4732" }}>Volume</td>
                        <td>
                          : {item.Volume} m<sup>3</sup>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td style={{ color: "#ff4732" }}>Poids</td>
                        <td>: {item.Poids}</td>
                      </tr>
                    )}

                    {item.Envoi === "Maritime" ? (
                      ""
                    ) : (
                      <tr>
                        <td style={{ color: "#ff4732" }}>Poids volumétrique</td>
                        <td>
                          : {item.Poids_volumétrique} m<sup>3</sup>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </table>
            </div>

            {data.map((item, index) => (
              <div className="progression" key={index}>
                <ul>
                  <li>
                    {" "}
                    <i className="icon uil uil-yen-circle"></i>
                    <div
                      className={`progress one ${
                        item.Statut == "ENTREPOT CHINE" ||
                        item.Statut == "EN TRANSIT" ||
                        item.Statut == "EN DOUANE" ||
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
                    {/* <i className="icon uil-plane"></i> */}
                    <i className="icon uil uil-clipboard-notes"></i>
                    <div className="progress two active">
                      <p>2</p>
                      <i className="uil uil-check"></i>
                    </div>
                    <p className="text">Entrepôt Chine</p>
                  </li>

                  <li>
                    {/* <i className="icon uil-plane"></i> */}
                    <i
                      className={`icon ${
                        item.Envoi == "Maritime" ? "uil-ship" : "uil-plane"
                      }`}
                    ></i>
                    <div
                      className={`progress two ${
                        (item.Statut == "EN TRANSIT" ||
                          item.Statut == "EN DOUANE" ||
                          item.Statut == "ARRIVEE A MDG") &&
                        "active"
                      }`}
                    >
                      <p>3</p>
                      <i className="uil uil-check"></i>
                    </div>
                    <p className="text">En transit</p>
                  </li>

                  {/* en douane au port MDG */}
                  {item.Envoi === "Maritime" ? (
                    <li>
                      <i
                        className={`icon ${
                          item.Envoi == "Maritime"
                            ? "uil-store-alt"
                            : "uil-plane"
                        }`}
                      ></i>
                      <div
                        className={`progress three ${
                          (item.Statut == "EN DOUANE" ||
                            item.Statut == "ARRIVEE A MDG") &&
                          "active"
                        }`}
                      >
                        <p>{item.Envoi === "Maritime" ? "4" : "3"}</p>
                        <i className="uil uil-check"></i>
                      </div>
                      <p className="text">En Douane MDG</p>
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
                        item.Envoi == "Maritime" && "four"
                      } three ${item.Statut == "ARRIVEE A MDG" && "active"}`}
                    >
                      <p>{item.Envoi === "Maritime" ? "5" : "4"}</p>
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
                    {/* <p className="text">Colis arrivé</p> */}
                  </li>
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TrackingScreen;
