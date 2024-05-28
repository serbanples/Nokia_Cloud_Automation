import React from 'react'

const VMBox = ({ data }) => {
  return (
        <div className="border p-4 bg-white shadow-md rounded-md">
          {Object.keys(data).map((key) => (
            <div key={key} className="mb-2">
              <span className="font-bold">{key}:</span> {data[key]}
            </div>
          ))}
        </div>
      ); 
}

export default VMBox