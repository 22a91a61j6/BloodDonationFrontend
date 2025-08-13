import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import LiveCountSlick from "./LiveCountSlick";
import axios from "axios";

const StatisticsPage = (props) => {
  const [liveCounts, setLiveCounts] = useState(0); // State for live counts
  const [noEvent, setNoEvent] = useState(false);

  const fetchLiveCounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/count-by-gender?EventDate=YES"
      );
      if (response.data && response.data.data) {
        // Calculate the total count from the response
        const totalCounts = response.data.data.reduce((acc, item) => acc + item.value, 0);
        setLiveCounts(totalCounts); // Update live counts
        setNoEvent(totalCounts === 0); // Set `noEvent` if the total count is 0
      } else {
        setLiveCounts(0);
        setNoEvent(true);
      }
    } catch (error) {
      console.error("Error fetching live counts:", error);
      setLiveCounts(0);
      setNoEvent(true);
    }
  };

  useEffect(() => {
    // Fetch live counts on initial render and set an interval for periodic updates
    fetchLiveCounts();
    const interval = setInterval(fetchLiveCounts, 10000); // Update every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Fragment>
      <Header hclass={"header--styleFour"} />
      <main className="main" style={{ marginBottom: "40px" }}>
        <PageTitle pageTitle={"LIVE STATISTICS"} pagesub={"LIVE STATISTICS"} />
        <div
          style={{
            width: "100%",
            display: "flex",
            borderBottom: "3px solid black",
            justifyContent: "center",
            color: "red",
            fontSize: 50,
            fontWeight: 600,
            marginTop: 50,
          }}
        >
          Live Count {liveCounts}
        </div>

        <div
          style={{
            height: 500,
            width: "60%",
            justifySelf: "center",
            display: "block",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <LiveCountSlick />
        </div>
        {noEvent && (
          <div className="headForContact">
            <span className="sectionTitle__small">
              <i className="fa-solid fa-user btn__icon"></i>
              Live Stats
            </span>
          </div>
        )}
        {noEvent && (
          <div
            className="form-container"
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
              fontSize: "30px",
              wordSpacing: "5px",
            }}
          >
            NO ONGOING EVENTS AT THE MOMENT
          </div>
        )}
      </main>

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default StatisticsPage;
