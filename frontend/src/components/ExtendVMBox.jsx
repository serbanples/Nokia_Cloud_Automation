import React from 'react';

const ExtendVMBox = ({ vmData }) => {
  if (!vmData) {
    return <div>Select a VM to see details</div>;
  }

  return (
    <div className="border p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">{vmData.name}</h2>
      {Object.entries(vmData).map(([key, value]) => (
        key !== 'name' && value !== null && (  // Check for null to avoid displaying empty fields
          <div key={key} className="mb-2">
            <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}
          </div>
        )
      ))}
    </div>
  );
};

export default ExtendVMBox;