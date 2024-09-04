import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useEditing } from "../../../context/EditingProvider";


export default function Darbandi() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isEditing } = useEditing();
  const [showAddData, setShowAddData] = useState(false);

  // Uncomment to enable data fetching
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://your-api-endpoint.com/data'); // Replace with your API endpoint
  //       setTableData(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Uncomment to enable save functionality
  // const handleSaveData = async (newData) => {
  //   try {
  //     await axios.post('https://your-api-endpoint.com/save', newData); // Replace with your API endpoint
  //     setTableData(newData);
  //     alert('Data saved successfully!');
  //   } catch (err) {
  //     console.error('Error saving data:', err);
  //     alert('Failed to save data.');
  //   }
  // };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
   <>
   <h1 className='mt-6 text-center text-white'>No data at the moment</h1>
   
   
   
   </>
  );
}
