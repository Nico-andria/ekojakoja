import React from "react";
import styles from "../../assets/css/Button.module.css";
import { FaSpinner } from "react-icons/fa";

const Button = ({ label, icon, disabled, color, isLoading }) => {
  return (
    <button
      type="submit"
      className={styles.submitButton}
      disabled={disabled} // Applique l'état disabled
      style={{ backgroundColor: color }}
    >
      {isLoading ? (
        <FaSpinner className={styles.loadingSpinner} /> // Icône de chargement
      ) : (
        <>
          {icon && <img src={icon} alt="" className={styles.buttonIcon} />}
          <span className={styles.buttonLabel}>{label}</span>
        </>
      )}
    </button>
  );
};

export default Button;
