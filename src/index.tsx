import React, { useState, useEffect, useCallback } from 'react';
import Map from './GoogleMap';

export interface Position {
  lat: number;
  lng: number;
}

export interface LocationPickerProps {
  onChange: (location: { position: Position; places: google.maps.GeocoderResult[]; address: string }) => void;
  defaultPosition: Position;
  zoom?: number;
  radius?: number;
  circleOptions?: google.maps.CircleOptions;
  mapContainerStyle?: React.CSSProperties;
}

const DEFAULT_RADIUS = 1000;
const DEFAULT_ZOOM = 10;
const DEFAULT_CIRCLE_OPTIONS: google.maps.CircleOptions = {
  fillColor: 'red',
  fillOpacity: 0.2,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 1.2
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  onChange,
  defaultPosition,
  zoom = DEFAULT_ZOOM,
  radius = DEFAULT_RADIUS,
  circleOptions = DEFAULT_CIRCLE_OPTIONS,
  mapContainerStyle = { height: '400px', width: '100%' }
}) => {
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [shouldRecenterMap, setShouldRecenterMap] = useState(false);

  const notify = useCallback((pos: Position, places: google.maps.GeocoderResult[]) => {
    const location = {
      position: pos,
      places,
      address: places.length > 0 ? places[0].formatted_address : ''
    };
    onChange && onChange(location);
  }, [onChange]);

  const geocodePosition = useCallback((pos: Position): Promise<google.maps.GeocoderResult[]> => {
    if (typeof google === 'undefined') {
      return Promise.reject(new Error('Google Maps API not loaded'));
    }
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: pos }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }, []);

  const handleMarkerDragEnd = useCallback((mouseEvent: google.maps.MapMouseEvent) => {
    if (!mouseEvent.latLng) return;
    const lat = mouseEvent.latLng.lat();
    const lng = mouseEvent.latLng.lng();
    const newPos = { lat, lng };
    setPosition(newPos);
    setShouldRecenterMap(false);
    
    geocodePosition(newPos)
      .then(places => notify(newPos, places))
      .catch(err => {
        console.error(err);
        notify(newPos, []);
      });
  }, [geocodePosition, notify]);

  // Handle defaultPosition changes
  useEffect(() => {
    setPosition(defaultPosition);
    setShouldRecenterMap(true);
    
    geocodePosition(defaultPosition)
      .then(places => notify(defaultPosition, places))
      .catch(err => {
        // Silently fail or log if geocoding fails on initial load
        notify(defaultPosition, []);
      });
  }, [defaultPosition.lat, defaultPosition.lng, geocodePosition, notify]);

  return (
    <Map
      mapContainerStyle={mapContainerStyle}
      handleMarkerDragEnd={handleMarkerDragEnd}
      position={position}
      circleOptions={circleOptions}
      radius={radius}
      zoom={zoom}
      shouldRecenterMap={shouldRecenterMap}
    />
  );
};

export default LocationPicker;
