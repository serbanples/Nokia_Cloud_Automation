import axios from 'axios';
import React, { useEffect, useState } from 'react';
import nokia_logo from "../../../public/nokia-logo.png";
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import VMBox from '../../components/VMBox';

const Home = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <NavBar />
      <div className='bg-black w-full h-screen'>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((row, index) => (
          <VMBox key={index} data={row} />
        ))}
      </div>
    </div>
    )
}

export default Home