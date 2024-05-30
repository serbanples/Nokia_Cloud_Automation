import React from 'react';

const VMBox = ({ data, onClick }) => {
  return (
    <div className="border p-4 bg-white shadow-md rounded-md cursor-pointer" onClick={onClick}>
      <h2 className="text-lg font-bold mb-4">{data.name}</h2>
      <div className="mb-2">
        <span className="font-semibold capitalize">VM1:</span> {data.VM1}
      </div>
      {data.VM2 !== null && (
        <div className="mb-2">
          <span className="font-semibold capitalize">VM2:</span> {data.VM2}
        </div>
      )}
      <div className="mb-2">
        <span className="font-semibold capitalize">Owner:</span> {data.owner}
      </div>
    </div>
  );
};

export default VMBox;
