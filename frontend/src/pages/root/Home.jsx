import React, { useEffect, useState } from 'react';
import NavBar from '../../components/shared/NavBar';
import VMBox from '../../components/vmbox/VMBox';
import ApiService from '../../api/apiService';
import AuthService from '../../api/authService';
import ModalForm from '../../components/forms/ModalForm';
import AddVMBox from '../../components/vmbox/AddVMBox';
import ExtendVMBox from '../../components/vmbox/ExtendVMBox';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVM, setSelectedVM] = useState(null);

  useEffect(() => {
    const isAdmin = AuthService.getAdminState();
    setIsAdmin(isAdmin);
  }, []);

  useEffect(() => {
    ApiService.getVMs().then(rawData => {
      const sortedData = rawData.vms.sort((a, b) => b.has_access - a.has_access);
      setData(sortedData);
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
      window.location.reload();
    } catch (error) {
        console.error('Error creating VM:', error);
    }
  };

  const handleVMClick = (vmData) => {
    setSelectedVM(vmData);
  };

  const handleVMDelete = async (vmId) => {
    try {
      await ApiService.deleteVM(vmId);
      setData(data.filter(vm => vm.id !== vmId));
    } catch (error) {
      console.error('Error deleting VM:', error);
    }
  };

  return (
    <div className='px-10 pb-10 pt-32 flex'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-5/12 border-r-white border-r-2 pr-6">
        {data.map((row, index) => (
          <div key={index} className={row.has_access ? '' : 'opacity-50'}>
            <VMBox data={row} onClick={() => handleVMClick(row)} onDelete={handleVMDelete} />
          </div>
        ))}
        {isAdmin && (
          <AddVMBox onClick={handleAddClick} />
        )}
      </div>
      <div className='w-7/12 pl-6 flex items-start'>
          <ExtendVMBox vmData={selectedVM} />
      </div>
      <ModalForm isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleFormSubmit} />
    </div>
  )
}

export default Home;