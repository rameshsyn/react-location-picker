import React from "react";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import GoogleMap from "react-google-maps/lib/components/GoogleMap";
import Marker from "react-google-maps/lib/components/Marker";
import Circle from "react-google-maps/lib/components/Circle";
import SearchBox from "./SearchBox";

/* Create map with withGoogleMap HOC */
/* https://github.com/tomchentw/react-google-maps */

const Map = withGoogleMap(props => {
  const {
    position,
    defaultZoom,
    handleMarkerDragEnd,
    onZoomChanged,
    radius,
    circleOptions,
    shouldRecenterMap,
    zoom,
    onChangeInput,
    onChangeSuggestion,
    address,
    search
  } = props;
  
  const circle =
    radius !== -1 ? (
      <Circle center={position} radius={radius} options={circleOptions} />
    ) : null;
  const mapExtraProps = shouldRecenterMap ? { center: position } : {};
  return (
    <GoogleMap
      onZoomChanged={onZoomChanged}
      defaultZoom={defaultZoom}
      defaultCenter={position}
      defaultOptions={{
        mapTypeControlOptions:{position:12},
        fullscreenControlOptions: {position:6}
      }}
      zoom={zoom}
      {...mapExtraProps}
    >
      <SearchBox {...{onChangeInput,onChangeSuggestion,search,address}} />
      {/* Map marker */}
      <Marker
        draggable // Allow marker to drag
        position={position}
        onDragEnd={handleMarkerDragEnd}
      />

      {/* Circle */}
      {circle}
    </GoogleMap>
  );
});

export default Map;
