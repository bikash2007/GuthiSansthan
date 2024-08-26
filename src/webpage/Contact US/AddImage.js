import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddImages() {
  const [spokespersons, setSpokespersons] = useState([]);

  useEffect(() => {
    axios.get('/api/spokespersons')
      .then(response => {
        setSpokespersons(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the spokespersons data!", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {spokespersons.map((spokesperson, index) => (
        <div key={index} className="flex flex-col items-center justify-center w-full max-w-sm p-4 m-4 space-y-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <p className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-md">
            {spokesperson.role}
          </p>
          <img 
            src={spokesperson.image} 
            alt={spokesperson.name} 
            className="w-40 h-40 rounded-full shadow-md" 
          />
          <p className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-md">
            {spokesperson.name}
          </p>
          <p className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-md">
            {spokesperson.phone}
          </p>
        </div>
      ))}
    </div>
  );
}
