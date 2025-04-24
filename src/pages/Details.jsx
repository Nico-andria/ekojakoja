import React from "react";
import TrackingModule from "../components/Main/TrackingModule";
// import OrderDetails from "../components/Details/OrderDetails";
// import TrackingItem from "../components/Details/TrackingItem";
import TrackingTimeline from "../components/Details/TrackingTimeline";
import "../assets/css/details.css";
import TrackingTimelinee from "../components/Details/TrackingTimelinee";
import Track from "../components/Details/Track";
const Details = () => {
  return (
    <>
      <div className="mainDetails">
        <TrackingModule />
        {/* <OrderDetails /> */}
        {/* <TrackingItem /> */}
        {/* <TrackingTimeline /> */}
        {/* <TrackingTimelinee /> */}
        <Track />
      </div>
    </>
  );
};

export default Details;
