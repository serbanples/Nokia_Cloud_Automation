import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import VMBox from '../../components/vmbox/VMBox';
import ApiService from '../../api/apiService';
import AuthService from '../../api/authService';
import ModalForm from '../../components/ModalForm';
import AddVMBox from '../../components/vmbox/AddVMBox';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isAdmin = AuthService.getAdminState();
    setIsAdmin(isAdmin);
  }, []);

  const [vms, setVms] = useState([]);

  useEffect(() => {
    const fetchVMs = async () => {
        try {
            const response = await ApiService.getVMs();
            setVms(response.vms);
            console.log('vms', response.vms); 
        } catch (error) {
            console.error('Error fetching VMs:', error);
        }
    };

    fetchVMs();
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

  const handleFormSubmit = async (newData) => {
    try {
      const response = await ApiService.createVM(newData);
      console.log('VM created successfully:', response);
  } catch (error) {
      console.error('Error creating VM:', error);
  }
  };

  return (
    <div>
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