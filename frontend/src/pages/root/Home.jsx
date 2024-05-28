import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import VMBox from '../../components/vmbox/VMBox';
import ApiService from '../../api/apiService';
import AuthService from '../../api/authService';
import ModalForm from '../../components/ModalForm';
import AddVMBox from '../../components/vmbox/AddVMBox';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isAdmin = AuthService.getAdminState();
    setIsAdmin(isAdmin);
  }, []);

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

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleFormSubmit = (newData) => {
    console.log(newData);
  };

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
        {isAdmin && (
          <AddVMBox onClick={handleAddClick} />
        )}
      </div>
      <ModalForm isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleFormSubmit} />
    </div>
    )
}

export default Home