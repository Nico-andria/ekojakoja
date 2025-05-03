import React from "react";
import TrackingModule from "../components/Main/TrackingModule";
import "../assets/css/details.css";
import Track from "../components/Details/Track";

const Details = () => {
  return (
    <>
      <div className="mainDetails">
        <TrackingModule isInDetails={true} />

        <Track />
      </div>
    </>
  );
};

export default Details;
