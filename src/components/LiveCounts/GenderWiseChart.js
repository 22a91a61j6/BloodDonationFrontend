import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

import { io } from 'socket.io-client';

const port = process.env.REACT_APP_SERVER_PORT;
const socket = io(port); // Connect to the Socket.IO server


function GenderWiseChart() {
  const [data, setData] = useState([
    {
      id: 0,
      value: 1,
      label: "MALE: 1",
    },
    {
      id: 1,
      value: 1,
      label: "FEMALE: 1",
    },
  ]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/count-by-gender?EventDate=YES')
      .then((response) => {
        // Extract the `data` field from the API response and update the state
        if (response.data && response.data.data) {
          setData(response.data.data);
        }
        console.log("Data fetched", response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h4
        className="chart-title"
        style={{ marginBottom: 50, alignSelf: "center", marginTop: 20 }}
      >
        Gender Wise Count
      </h4>
      <PieChart
        series={[
          {
            data, // Pass the updated data directly
          },
        ]}
        width={window.innerWidth * 0.5}
        height={window.innerHeight * 0.4}
      />
    </div>
  );
}

export default GenderWiseChart;
