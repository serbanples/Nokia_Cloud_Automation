import axios from 'axios';
import React, { useEffect, useState } from 'react';
import nokia_logo from "../../../public/nokia-logo.png";
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import VMBox from '../../components/VMBox';

const Home = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:5000/data'); // Replace with your API endpoint
  //       console.log(response);
  //       // setData(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="container mx-auto p-4 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((row, index) => (
          <VMBox key={index} data={row} />
        ))}
      </div>
    </div>
    )
}

export default Home