import React, { Fragment } from "react";
import Header from "../../components/header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";

const StatisticsPage = () => {
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
          Live Counts and Live Stats
        </div>

        <div
        style={{
          height: 500,
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontSize: 30,
          color: "black",
          margin: "0 auto",
        }}
      >
        <span style={{ marginBottom: 20, fontWeight: 600 }}>
          NO ONGOING EVENTS
        </span>
        <span style={{ fontSize: 24 }}>
          AT THE MOMENT
        </span>
      </div>

      </main>

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default StatisticsPage;
