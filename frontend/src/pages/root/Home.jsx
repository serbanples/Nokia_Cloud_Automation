import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import VMBox from '../../components/VMBox';
import ApiService from '../../api/apiService';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    ApiService.fetchData().then(rawData => {
      const headers = rawData[0];
      const rows = rawData.slice(1);
      const formattedData = rows.map(row => {
        let obj = {};
        row.forEach((value, index) => {
          obj[headers[index]] = value;
        });
        return obj;
      });
      setData(formattedData);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <div className='bg-black w-full'>
        aaa
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