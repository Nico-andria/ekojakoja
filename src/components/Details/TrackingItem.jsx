import React from "react";
import styles from "../../assets/css/TrackingScreen.module.css";

const TrackingItem = ({ id, colisCount }) => {
  return (
    <div className={styles.trackingItem}>
      <div className={styles.trackingItemContent}>
        <div className={styles.trackingNumber}>
          {id} - <span className={styles.colisCount}>{colisCount} colis</span>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/6fd89aac11cf475281a5c0287ada72e5/3358615032dbabcc29fa5bad7a971ff30499cf88dec23cf3bc516c09e474e8b8?apiKey=6fd89aac11cf475281a5c0287ada72e5&"
          alt=""
          className={styles.expandIcon}
        />
      </div>
    </div>
  );
};

export default TrackingItem;
