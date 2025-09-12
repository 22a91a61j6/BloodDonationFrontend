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
            justifySelf: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            color: "black",
            textAlign: "center",
          }}
        >
          NO ONGOING EVENTS AT THE MOMENT
        </div>
      </main>

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default StatisticsPage;
