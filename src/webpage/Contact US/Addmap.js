import React, { useState } from 'react';

const MyMapIframe = ({ initialUrl }) => {
  const [mapUrl, setMapUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [error, setError] = useState('');

  // Handler to update the input URL state
  const handleInputChange = (event) => {
    const url = event.target.value;
    setInputUrl(url);
    
    // Updated pattern to match a broader range of Google Maps URLs
    const googleMapsUrlPattern = /^https:\/\/www\.google\.com\/maps\/.*$/;
    if (googleMapsUrlPattern.test(url)) {
      setError('');
    } else {
      setError('Invalid URL. Please enter a valid Google Maps URL.');
    }
  };
  

  // Handler to update the map URL when the button is clicked
  const handleUpdateClick = () => {
    if (!error) {
      setMapUrl(inputUrl);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <iframe
        src={mapUrl}
        width="100%"
        height="450"
        className="border-0 rounded-lg"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      ></iframe>
      <div className="mt-4 flex flex-col items-center">
        <input
          type="text"
          value={inputUrl}
          onChange={handleInputChange}
          placeholder="Enter new map URL"
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <button
          onClick={handleUpdateClick}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Update
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default MyMapIframe;
