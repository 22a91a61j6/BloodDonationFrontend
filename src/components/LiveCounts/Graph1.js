import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { io } from 'socket.io-client';

const port = process.env.REACT_APP_SERVER_PORT;
const socket = io(port); // Connect to the Socket.IO server

const Graph1 = (props) => {
  const [uData, setUData] = useState([]);
  const [pData, setPData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(port +`live-counts?Venue=${props.college}`);

      setPData(result.data.pData);
      setUData(result.data.uData);
      setXLabels(result.data.xLabels);

      const totalShowedInterest = result.data.pData.reduce((a, b) => a + b, 0);
      const totalAttended = result.data.uData.reduce((a, b) => a + b, 0);

      props.setTotalCounts({ attended: totalAttended, showedInterest: totalShowedInterest });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Listen for new registration events from the server
    socket.on('new-registration', () => {
      // console.log('Received new registration event');
      fetchData(); // Fetch updated data whenever a new registration is added
    });

    return () => {
      socket.off('new-registration');
    };
  }, [props.college]);

  return (
    <center>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <BarChart
          width={window.innerWidth * 0.6}
          height={400}
          series={[
            { data: pData, label: 'Registered', id: 'pvId' },
            { data: uData, label: 'Attended', id: 'uvId' },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
        />
      </div>
    </center>
  );
};

export default Graph1;
