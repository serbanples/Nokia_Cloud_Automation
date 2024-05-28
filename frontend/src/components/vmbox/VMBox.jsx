// import React from 'react'

// const VMBox = ({ data }) => {
//   return (
//         <div className="border p-4 bg-white shadow-md rounded-md">
//           {Object.keys(data).map((key) => (
//             <div key={key} className="mb-2">
//               <span className="font-bold">{key}:</span> {data[key]}
//             </div>
//           ))}
//         </div>
//       ); 
// }

// export default VMBox

import React from 'react';

const VMBox = ({ data }) => {
  return (
    <div className="border p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">{data.Name}</h2>
      {Object.entries(data).map(([key, value]) => (
        key !== 'Name' && value !== null && (  // Check for null to avoid displaying empty fields
          <div key={key} className="mb-2">
            <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}
          </div>
        )
      ))}
    </div>
  );
};

export default VMBox;
