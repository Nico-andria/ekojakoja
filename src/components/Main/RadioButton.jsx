import React from "react";
import styles from "../../assets/css/RadioButton.module.css";

const RadioButton = ({ id, label, checked, onChange }) => {
  return (
    <div className={styles.radioButton}>
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        className={styles.radioInput}
      />
      <label htmlFor={id} className={styles.radioLabel}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
