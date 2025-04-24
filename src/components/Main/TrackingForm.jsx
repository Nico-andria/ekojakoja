import React, { useState } from "react";
import styles from "../../assets/css/TrackingForm.module.css";
import RadioButton from "./RadioButton";
import InputField from "./InputField";
import Button from "./Button";
import icone from "../../assets/Icones/Icon_Box_Desktop_Tablette.png";

import { useNavigate } from "react-router-dom";

const TrackingForm = () => {
  const [trackingType, setTrackingType] = useState("Pseudo");
  const [inputValue, setInputValue] = useState("");
  const [paramType, setParamType] = useState("Pseudo");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //loading button
  const [inputError, setInputError] = useState(false);

  const navigate = useNavigate();

  const handleTrackingTypeChange = (type) => {
    setTrackingType(type);
    setParamType(type === "Pseudo" ? "Pseudo" : "Tracking");
  };

  // Fonction pour mettre à jour l'état de l'input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);

    // Activer l'icône de chargement si l'input n'est pas vide
    setIsLoading(value.trim() !== "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `https://sheetdb.io/api/v1/qms48o92dvn20/search?${paramType}=${encodeURIComponent(
        inputValue
      )}`;

      setLoading(true);
      setIsLoading(true);
      setError(null);
      setInputError(false);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Numéro ou pseudo invalide"); // Lancer une erreur si la réponse n'est pas OK
      }

      const res = await response.json();
      setData(res);
      if (res.length === 0) {
        throw new Error("Numéro ou pseudo invalide");
      }
      console.log("la réponse est : ", res);
      // Décommenter si nécessaire :
      navigate("/details", { state: { data: res } });
    } catch (error) {
      setInputError(true);
      setError(error.message);
      setData(null);
      console.log("l'erreur est : ", error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  // Définir la couleur du bouton en fonction de la valeur de l'input et de l'état de chargement
  const buttonColor = isLoading
    ? "#21a179" // Vert si en cours de chargement
    : inputValue.trim()
    ? "#182F3C" // Gris clair si l'input est rempli
    : "#B7BFC3"; // Bleu par défaut si l'input est vide
  return (
    <form className={styles.trackingForm} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <img src={icone} alt="Tracking icon" className={styles.trackingIcon} />
        <h2 className={styles.formTitle}>Suivre un colis</h2>
      </div>
      <div className={styles.radioGroup}>
        <p className={styles.radioGroupLabel}>Sélectionnez le type de numéro</p>
        <div className={styles.radioOptions}>
          <RadioButton
            id="pseudo"
            label="Pseudo"
            checked={trackingType === "Pseudo"}
            onChange={() => handleTrackingTypeChange("Pseudo")}
          />
          <RadioButton
            id="trackingNumber"
            label="Numéro de suivi"
            checked={trackingType === "Tracking"}
            onChange={() => handleTrackingTypeChange("Tracking")}
          />
        </div>
      </div>
      <div className="inputText">
        <InputField
          label="Renseignez le numéro ici"
          placeholder="Ex : 78778556280555600 ou E101"
          className="inputText"
          value={inputValue} // Liez la valeur
          //   onChange={(e) => setInputValue(e.target.value)}
          onChange={handleInputChange}
          hasError={inputError}
        />
        {inputError && (
          <p className={styles.errorMessage}>Numéro ou pseudo invalide</p>
        )}
      </div>
      <div className="buttonSubmit"></div>
      <Button
        label="Rechercher"
        icon="https://cdn.builder.io/api/v1/image/assets/6fd89aac11cf475281a5c0287ada72e5/8f9b273e89a9a34c22a2a04fed7e081631e7b36720e282baafc082dd382a9c4e?apiKey=6fd89aac11cf475281a5c0287ada72e5&"
        disabled={!inputValue.trim() || loading}
        color={buttonColor}
        isLoading={isLoading || loading} // Passe l'état de chargement
      />
    </form>
  );
};

export default TrackingForm;
