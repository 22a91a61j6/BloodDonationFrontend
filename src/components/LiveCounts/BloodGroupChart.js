import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const port = process.env.REACT_APP_SERVER_PORT || 'http://localhost:3001';
const socket = io(port);

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff7300', '#82ca9d', '#ffc658'];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function BloodGroupChart(props) {
  const [donorData, setDonorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = `${port}/count-by-blood-group?collegeCode=${props.college}&EventDate=YES`;
        const result = await axios.get(url);

        const actualResult = Object.entries(result.data).map(([key, value]) => ({
          name: key === "UnKnown" ? "Unknown" : key,
          count: value,
          pv: 0,
          amt: 0
        }));
        
        setDonorData(actualResult);
      } catch (error) {
        console.error('Error fetching blood group data:', error);
        setError('Failed to load data');
        setDonorData([{
          name: "No Data",
          count: 0,
          pv: 0,
          amt: 0
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Listen for real-time updates
    socket.on('new-registration', fetchData);

    return () => {
      socket.off('new-registration');
    };
  }, [props.college]);

  if (loading) {
    return (
      <div className='chart2'>
        <h2 className="chart-title">Blood Group Count</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350 }}>
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='chart2'>
        <h2 className="chart-title">Blood Group Count</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350 }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='chart2'>
      <h2 className="chart-title">Blood Group Count</h2>
      <BarChart
        width={window.innerWidth * 0.6}
        height={350}
        data={donorData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={false} />
        <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {donorData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
