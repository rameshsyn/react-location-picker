/**
 * REACT LOCATION PICKER
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from './GoogleMap';

/* Default configuration */
const DEFAULT_RADIUS = 1000;
const DEFAULT_ZOOM = 10;

/* Circle options */
// https://developers.google.com/maps/documentation/javascript/3.exp/reference#CircleOptions
const DEFAULT_CIRCLE_OPTIONS = {
  fillColor: 'red',
  fillOpacity: 0.2,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 1.2
};

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: props.defaultPosition,
      shouldRecenterMap: false
    };

    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { defaultPosition } = props;
    if (
      JSON.stringify(defaultPosition) !==
      JSON.stringify(state.position)
    ) {
      //console.log("New position:");
      //console.log(state.position);
      return { position: state.position, shouldRecenterMap: true };
    } else
      return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.position !== this.state.position){
      //console.log("prevState.position", prevState.position);
      //console.log("this.state.position", this.state.position);

      // Reverse geocode new default position
      this.geocodePosition(this.state.position)
        .then(places => {
          this.notify(this.state.position, places);
        })
        .catch(err => {
          console.error(err);
          this.notify(this.state.position, []);
        });
    }
  }

  notify(position, places) {
    const { onChange } = this.props;
    const location = {
      position,
      places,
      address: places.length > 0 ? places[0].formatted_address : ''
    };
    onChange && onChange(location);
  }
  /**
   * Handle Map marker position change
   * @param { MouseEvent } mouseEvent // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent
   */
  handleMarkerDragEnd(mouseEvent) {
    // Get latitude and longitude
    const lat = mouseEvent.latLng.lat();
    const lng = mouseEvent.latLng.lng();
    const position = { lat, lng };
    this.setState({ position, shouldRecenterMap: false });
  }

  /**
   * Geocode position to places
   * @param { Object } position
   * @return { Promise }
   */
  geocodePosition(position) {
    // Geocoder instance
    const geocoder = new window.google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

  render() {
    const {
      zoom,
      radius,
      circleOptions,
      mapContainerStyle,
      mapOptions
    } = this.props;

    const { position, shouldRecenterMap } = this.state;

    return (
      <Map
        mapOptions={mapOptions}
        mapContainerStyle={mapContainerStyle}
        handleMarkerDragEnd={this.handleMarkerDragEnd}
        position={position}
        circleOptions={circleOptions}
        radius={radius}
        defaultZoom={zoom}
        zoom={zoom}
        shouldRecenterMap={shouldRecenterMap}
      />
    );
  }
}

LocationPicker.propTypes = {
  mapContainerStyle: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultPosition: PropTypes.object.isRequired,
  zoom: PropTypes.number,
  radius: PropTypes.number,
  circleOptions: PropTypes.object,
  mapOptions: PropTypes.object
};

LocationPicker.defaultProps = {
  zoom: DEFAULT_ZOOM,
  radius: DEFAULT_RADIUS,
  circleOptions: DEFAULT_CIRCLE_OPTIONS
};

export default LocationPicker;
