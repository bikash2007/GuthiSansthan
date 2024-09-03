import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RaitaniShow from './RaitaniShow'
import Admin from './Admin';

import { useEditing } from '../../../../../context/EditingProvider';

export default function Tainathi() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isEditing } = useEditing();
  const [showAddData, setShowAddData] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://your-api-endpoint.com/data');
//         setTableData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSaveData = async (newData) => {
//     try {
//       await axios.post('https://your-api-endpoint.com/save', newData);
//       setTableData(newData);
//       alert('Data saved successfully!');
//     } catch (err) {
//       console.error('Error saving data:', err);
//       alert('Failed to save data.');
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

// //   if (error) {
//     return <p>Error: {error}</p>;
//   }

  return (
    <div className="container p-6 mx-auto md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
        {isEditing && (
          <div className="flex justify-center mb-6">
            <button
              className="p-3 text-white transition duration-300 bg-green-600 rounded-lg shadow-md md:w-[150px] hover:bg-green-700"
              onClick={() => setShowAddData(!showAddData)}
            >
              {showAddData ? 'Hide Add Data' : 'Edit & Add Data'}
            </button>
          </div>
        )}

        {isEditing && showAddData && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-center">Edit Data</h2>
            <Admin 
              tableData={tableData}
            //   onSaveData={handleSaveData}
            />
          </div>
        )}

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-center">Raitani</h2>
          <RaitaniShow tableData={tableData} />
        </div>
      </div>
    </div>
  );
}
