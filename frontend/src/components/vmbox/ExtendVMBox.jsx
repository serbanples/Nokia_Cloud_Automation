import React, { useState } from 'react';
import ConnectionModal from '../forms/ConnectionModal';
import ApiService from '../../api/apiService';

const ExtendVMBox = ({ vmData }) => {
  if (!vmData) {
    return <div className='flex justify-center text-white font-semibold'>Select a VM to see details</div>;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [terminalData, setTerminalData] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [command, setCommand] = useState('');
  const [customCommand, setCustomCommand] = useState('');

  const attemptConnection = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (credentials) => {
    try {
      const response = await ApiService.connectSSH(credentials.vm, credentials.username, credentials.password);
      if(response.success === true) {
        setIsConnected(true);
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsModalOpen(false);
  };

  const runScript = async () => {
    const finalCommand = command === 'other' ? customCommand : command;

    try {
      const response = await ApiService.runScript(finalCommand);
      if (response.output) {
        setTerminalData(response.output);
      } else if (response.error) {
        setTerminalData(response.error);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setTerminalData('Error executing command.');
    }
  };

  const closeConnection = async () => {
    try {
      const response = await ApiService.closeSSH();
      if(response.success === true) {
        setIsConnected(false);
        setTerminalData('');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  return (
    <div className='w-full'>
      <div className='flex'>
        <div className="border p-4 bg-white shadow-md rounded-md w-1/2">
          <h2 className="text-lg font-bold mb-4">{vmData.name}</h2>
          <div className='mb-2'>
            <span className='font-semibold capitalize'>Topology:</span> {vmData.topology}
          </div>
          <div className="mb-2">
            <span className="font-semibold capitalize">VM1:</span> {vmData.VM1}
          </div>
          {vmData.VM2 !== '0' && (
            <div className="mb-2">
              <span className="font-semibold capitalize">VM2:</span> {vmData.VM2}
            </div>
          )}
          <div className="mb-2">
            <span className="font-semibold capitalize">Owner:</span> {vmData.owner}
          </div>
          <div className='mb-2'>
            <span className='font-semibold capitalize'>M-Plane:</span> {vmData.M_Plane}
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2'>
          {!isConnected ? (
            <button 
            className="mb-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={attemptConnection}
          >
            Attempt Connection
          </button>
          ) : (
            <>
              <div className='flex'>
                <button 
                  className='mb-2 bg-blue-500 text-white px-4 py-2 rounded-md mr-3'
                  onClick={runScript}
                  >
                  Run Command
                </button>
                <button
                  className='mb-2 bg-red-500 text-white px-4 py-2 rounded-md ml-3'
                  onClick={closeConnection}
                >
                  Close Connection
                </button>
              </div>
              <select 
                className="border rounded-md px-2 py-1 w-10/12"
                value={command}
                onChange={handleCommandChange}
              >
                <option value="" disabled>Select an option</option>
                <option value="cd Desktop">cd Desktop</option>
                <option value="ls">ls</option>
                <option value="other">Other</option>
              </select>
              {command === 'other' && (
                <input 
                  type="text"
                  className="border rounded-md px-2 py-1 mt-2 w-10/12"
                  placeholder="Enter custom command"
                  value={customCommand}
                  onChange={(e) => setCustomCommand(e.target.value)}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="border border-gray-600 p-4 bg-black text-green-500 rounded-md mt-10 mx-12 h-64 overflow-y-scroll">
          <pre>{terminalData}</pre>
      </div>
      <ConnectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        vmData={vmData}
      />
    </div>
  );
};

export default ExtendVMBox;
