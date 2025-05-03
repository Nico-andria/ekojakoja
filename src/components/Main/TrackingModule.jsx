import React from "react";
import "../../assets/css/TrackingModule.css";
import logo from "../../assets/images/Logo_Desktop_Tablette.png";
import logoMobile from "../../assets/images/Logo_Mobile.png";
import TrackingForm from "./TrackingForm";

const TrackingModule = ({ isInDetails = false }) => {
  return (
    <div className={`trackingModule ${isInDetails ? "inDetails" : ""}`}>
      <div className="contentWrapper">
        <div className="logoSection">
          <img src={logo} alt="" className="logo desktop" />
          <img src={logoMobile} alt="" className="logo mobile" />

          <p className="slogan">
            Votre partenaire de confiance pour l'importation
          </p>
        </div>
        <TrackingForm />
        <div className="eKojaKojaLink">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6fd89aac11cf475281a5c0287ada72e5/8d81ebb7f11adba7fe84c341e3a7fd2d8b67b46d73b0862c1572b9a6f7b4717b?apiKey=6fd89aac11cf475281a5c0287ada72e5&"
            alt=""
            className="linkIcon"
          />
          <a
            href="https://web.facebook.com/Ekojakojakd"
            className="link"
            target="_blank"
          >
            E-KojaKoja
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackingModule;
