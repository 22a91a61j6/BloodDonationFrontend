import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { io } from "socket.io-client";

const port = process.env.REACT_APP_SERVER_PORT || "http://localhost:3001";
const socket = io(port);

function CollegeWiseChart() {
  const [data, setData] = useState({
    xAxis: [{ scaleType: "band", data: [] }],
    series: [{ data: [] }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${port}/count-by-college?EventDate=YES`);
      if (response.data) setData(response.data);
    } catch (err) {
      setError("Failed to load college data");
      setData({
        xAxis: [{ scaleType: "band", data: ["No Data"] }],
        series: [{ data: [0] }],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    socket.on("new-registration", fetchData);
    return () => {
      socket.off("new-registration");
    };
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <h4 style={{ marginBottom: 20, alignSelf: "center", marginTop: 20 }}>College Wise Count</h4>
        <p style={{ textAlign: "center" }}>Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <h4 style={{ marginBottom: 20, alignSelf: "center", marginTop: 20 }}>College Wise Count</h4>
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h4 style={{ marginBottom: 20, alignSelf: "center", marginTop: 20 }}>College Wise Count</h4>
      {data.series[0].data.length > 0 ? (
        <BarChart xAxis={data.xAxis} series={data.series} width={window.innerWidth * 0.6} height={400} />
      ) : (
        <p style={{ textAlign: "center" }}>No data available</p>
      )}
    </div>
  );
}

export default CollegeWiseChart;
