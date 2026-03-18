import React from 'react';
interface MapProps {
    position: google.maps.LatLngLiteral;
    zoom?: number;
    handleMarkerDragEnd: (e: google.maps.MapMouseEvent) => void;
    radius?: number;
    circleOptions?: google.maps.CircleOptions;
    shouldRecenterMap?: boolean;
    mapContainerStyle?: React.CSSProperties;
}
declare const Map: React.FC<MapProps>;
export default Map;
