import * as React from "react";
import {} from "googlemaps";

export interface Location {
  address: string;
  position: google.maps.LatLng;
  places: google.maps.GeocoderResult[];
}

export interface Props {
  mapContainerStyle: object;
  mapOptions?: object;
  onChange: (location: Location) => void;
  defaultPosition: google.maps.LatLng | google.maps.LatLngLiteral;
  zoom?: number;
  radius?: number;
  circleOptions?: google.maps.CircleOptions;
}

declare class LocationPicker extends React.Component<Props> {
  constructor(props: Props);
}

export default LocationPicker;
