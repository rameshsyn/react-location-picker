import React from 'react';
import {GoogleMap, Marker, Circle} from '@react-google-maps/api';


function Map (props) {
  const {
    position,
    defaultZoom,
    handleMarkerDragEnd,
    onZoomChanged,
    radius,
    circleOptions,
    shouldRecenterMap,
    zoom,
    mapContainerStyle,
    mapOptions
  } = props;

  const mapExtraProps = shouldRecenterMap ? {center: position} : {};

  return (
    <GoogleMap
      options={mapOptions}
      mapContainerStyle={mapContainerStyle}
      onZoomChanged={onZoomChanged}
      defaultZoom={defaultZoom}
      zoom={zoom}
      center={position}
      {...mapExtraProps}
    >

      <Marker
        draggable // Allow marker to drag
        position={position}
        onDragEnd={handleMarkerDragEnd}
      />

      {radius !== -1 &&
      <Circle
        center={position}
        radius={radius}
        options={circleOptions}
      />}

    </GoogleMap>
  )
}

export default Map;
