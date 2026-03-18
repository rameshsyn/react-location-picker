import React from 'react';
export interface Position {
    lat: number;
    lng: number;
}
export interface LocationPickerProps {
    onChange: (location: {
        position: Position;
        places: google.maps.GeocoderResult[];
        address: string;
    }) => void;
    defaultPosition: Position;
    zoom?: number;
    radius?: number;
    circleOptions?: google.maps.CircleOptions;
    mapContainerStyle?: React.CSSProperties;
}
declare const LocationPicker: React.FC<LocationPickerProps>;
export default LocationPicker;
