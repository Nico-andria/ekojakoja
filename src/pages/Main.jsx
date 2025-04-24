import React from "react";
import "../assets/css/main.css";

import logo from "../assets/images/Logo_Desktop_Tablette.png";
import TrackingForm from "../components/Main/TrackingForm";
import TrackingModule from "../components/Main/TrackingModule";

const Main = () => {
  return (
    <div className="main">
      <TrackingModule />
    </div>
  );
};

export default Main;
