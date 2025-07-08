import React from "react";
import { useLocation } from "react-router-dom";
import "../../assets/css/TimelineEvent.css";

const TimelineEvents = () => {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data);
  return (
    <div>
      {data?.map((item, index) => (
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
                  item.Envoi.includes("Maritime") ? "uil-ship" : "uil-plane"
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
                  color: `${item.Statut == "ARRIVEE A MDG" ? "#4caf50" : ""}`,
                }}
              ></i>
              <div
                className={`progress ${
                  item.Envoi.includes("Maritime") && "four"
                } three ${item.Statut == "ARRIVEE A MDG" && "active"}`}
              >
                <p>{item.Envoi.includes("Maritime") ? "5" : "4"}</p>
                <i className="uil uil-check"></i>
              </div>
              <p
                className="text"
                style={{
                  color: `${item.Statut == "ARRIVEE A MDG" ? "#4caf50" : ""}`,
                }}
              >
                Colis arrivé
              </p>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TimelineEvents;
