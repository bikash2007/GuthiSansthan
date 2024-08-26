import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddImage() {
  const [spokesperson, setSpokesperson] = useState({
    role: '',
    name: '',
    phone: '',
    image: ''
  });

  useEffect(() => {
    axios.get('/api/spokesperson')
      .then(response => {
        setSpokesperson(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the spokesperson data!", error);
      });
  }, []);

  return (
<div className="flex flex-col items-center justify-center w-full max-w-sm p-6 m-4 space-y-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
  <p className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 rounded-md">
    {spokesperson.role}
  </p>
  <img 
    src={spokesperson.image} 
    alt={spokesperson.name} 
    className="w-40 h-40 rounded-full border-4 border-gradient-to-r from-purple-400 via-pink-300 to-purple-400 shadow-lg"
  />
  <p className="text-xl font-bold text-gray-900 mb-2 bg-white px-4 py-2 rounded-md shadow-lg border border-gray-200">
    {spokesperson.name}
  </p>
  <p className="text-lg font-medium text-gray-800 bg-white px-4 py-2 rounded-md shadow-lg border border-gray-200">
    {spokesperson.phone}
  </p>
</div>

  );
}
