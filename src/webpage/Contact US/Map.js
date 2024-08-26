import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import axios from 'axios';

const mapStyles = {
  height: "400px",
  width: "100%"
};

export default function Map() {
  const [mapConfig, setMapConfig] = useState({
    lat: 27.7172, // Default latitude
    lng: 85.3240, // Default longitude
    zoom: 15      // Default zoom level
  });

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    axios.get('/api/map-location')
      .then(response => {
        setMapConfig({
          lat: response.data.lat,
          lng: response.data.lng,
          zoom: response.data.zoom
        });
      })
      .catch(error => {
        console.error("Error fetching the map location data!", error);
      });
  }, []);

  const handleLoad = (map) => {
    setMapLoaded(true);
    // Additional map load logic if needed
  };

  return (
    <div id="map" className="flex justify-center w-full sm:order-last sm:w-full lg:w-1/3 sm:col-12 md:order-first">
      <LoadScript googleMapsApiKey="AIzaSyDR-Piy7y9bIfz9HzE_dN_TAXJbM9UtA24">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={mapConfig.zoom}
          center={{ lat: mapConfig.lat, lng: mapConfig.lng }}
          onLoad={handleLoad}
        >
          {mapLoaded && <Marker position={{ lat: mapConfig.lat, lng: mapConfig.lng }} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
