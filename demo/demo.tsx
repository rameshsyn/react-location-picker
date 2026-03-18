import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { LoadScript } from '@react-google-maps/api';
import LocationPicker from 'react-location-picker';

const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

const LIBRARIES: ("geometry" | "drawing" | "places")[] = ["geometry", "drawing", "places"];

const LocationPickerExample: React.FC = () => {
  const [address, setAddress] = useState("Kala Pattar Ascent Trail, Khumjung 56000, Nepal");
  const [position, setPosition] = useState(defaultPosition);
  const [currentDefaultPosition, setCurrentDefaultPosition] = useState(defaultPosition);

  const handleLocationChange = useCallback(({ position, address }: { position: any, address: string }) => {
    setPosition(position);
    setAddress(address);
  }, []);

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        setCurrentDefaultPosition({
          lat: latitude,
          lng: longitude
        });
      });
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY_HERE"
      libraries={LIBRARIES}
    >
      <div>
        <a href="https://github.com/rameshsyn/react-location-picker#example">Example</a>&nbsp;&nbsp;&nbsp;
        <a href="https://github.com/rameshsyn/react-location-picker#usage">Usage</a>
        <h1>{address}</h1>
        <p>Latitude: {position.lat}, Longitude: {position.lng}</p>
        <div>
          <LocationPicker
            defaultPosition={currentDefaultPosition}
            radius={-1}
            onChange={handleLocationChange}
            mapContainerStyle={{ height: '400px', width: '100%' }}
          />
        </div>
      </div>
    </LoadScript>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<LocationPickerExample />);
}
