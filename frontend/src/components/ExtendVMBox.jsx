import React from 'react';

const ExtendVMBox = ({ vmData }) => {
  if (!vmData) {
    return <div className='flex justify-center text-white font-semibold'>Select a VM to see details</div>;
  }

  console.log(vmData);

  return (
    <div className="border p-4 bg-white shadow-md rounded-md w-fit">
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
  );
};

export default ExtendVMBox;