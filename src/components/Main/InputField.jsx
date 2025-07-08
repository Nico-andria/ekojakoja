import React from "react";
import styles from "../../assets/css/InputField.module.css";

const InputField = ({ label, placeholder, value, onChange, hasError }) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor="trackingInput" className={styles.inputLabel}>
        {label}
      </label>
      <input
        type="text"
        id="trackingInput"
        placeholder={placeholder}
        className={`${styles.inputElement} ${
          hasError ? styles.errorBorder : ""
        }`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
