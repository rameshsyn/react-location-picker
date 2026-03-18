import React from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

interface MapProps {
  position: google.maps.LatLngLiteral;
  zoom?: number;
  handleMarkerDragEnd: (e: google.maps.MapMouseEvent) => void;
  radius?: number;
  circleOptions?: google.maps.CircleOptions;
  shouldRecenterMap?: boolean;
  mapContainerStyle?: React.CSSProperties;
}

const Map: React.FC<MapProps> = ({
  position,
  zoom,
  handleMarkerDragEnd,
  radius,
  circleOptions,
  shouldRecenterMap,
  mapContainerStyle
}) => {
  const mapOptions = shouldRecenterMap ? { center: position } : {};

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={position}
      zoom={zoom}
      {...mapOptions}
    >
      <Marker
        draggable
        position={position}
        onDragEnd={handleMarkerDragEnd}
      />
      {radius !== undefined && radius !== -1 && (
        <Circle
          center={position}
          radius={radius}
          options={circleOptions}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
