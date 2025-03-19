import React from "react";
import TrackingModule from "../components/Main/TrackingModule";
// import OrderDetails from "../components/Details/OrderDetails";
// import TrackingItem from "../components/Details/TrackingItem";
import TrackingTimeline from "../components/Details/TrackingTimeline";
import "../assets/css/details.css";
import TrackingTimelinee from "../components/Details/TrackingTimelinee";
const Details = () => {
  return (
    <>
      <div className="mainDetails">
        <TrackingModule />
        {/* <OrderDetails /> */}
        {/* <TrackingItem /> */}
        {/* <TrackingTimeline /> */}
        <TrackingTimelinee />
      </div>
    </>
  );
};

export default Details;
