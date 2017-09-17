/**
 * REACT LOCATION PICKER
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from './GoogleMap';

const google = window.google;

/* Default configuration */
const DEFAULT_RADIUS = 1000;
const DEFAULT_ZOOM = 10;

/* Circle options */
// https://developers.google.com/maps/documentation/javascript/3.exp/reference#CircleOptions
const DEFAULT_CIRCLE_OPTIONS = {
  fillColor: "red",
  fillOpacity: 0.20,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 1.2,
};

class LocationPicker extends Component {
  constructor (props) {
    super(props);

    this.state = {
      position: props.defaultPosition
    };

    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
    this.geocodePosition = this.geocodePosition.bind(this);
  }

  componentWillReceiveProps (nextProps, prevProps) {
    const { defaultPosition } = nextProps;

    this.setState({ defaultPosition });
  }

  /**
   * Handle Map marker position change
   * @param { MouseEvent } mouseEvent // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent
   */
  handleMarkerDragEnd (mouseEvent) {

    // Get latitude and longitude
    const lat = mouseEvent.latLng.lat();
    const lng = mouseEvent.latLng.lng();

    const position = { lat, lng };

    // Get address
    this.geocodePosition(position)
      .then(address => {

        // Set new latitude and longitude
        this.setState({ position });

        const location = {
          position,
          address
        };

        // Pass location to application change listener
        this.props.onChange(location);
      });
  }

  /**
   * Geocode position to address
   * @param { Object } position
   * @return { Promise }
   */
  geocodePosition (position) {

    // Geocoder instance
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'location': position }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK)
          resolve(results[0].formatted_address);
        else
          reject(status);
      });
    });
  };

  render () {

    /* Get props */
    const {
      zoom,
      radius,
      circleOptions,
      containerElement,
      mapElement
    } = this.props;

    const { position } = this.state;

    /* Use default if not passed */
    const _zoom = zoom || DEFAULT_ZOOM;
    const _radius = radius || DEFAULT_RADIUS;
    const _circleOptions = circleOptions || DEFAULT_CIRCLE_OPTIONS;

    return (
      <Map
        containerElement={containerElement}
        mapElement={mapElement}
        handleMarkerDragEnd={this.handleMarkerDragEnd}
        position={position}
        circleOptions={_circleOptions}
        radius={_radius}
        defaultZoom={_zoom}
      />
    );
  }
}

/* Check props */
LocationPicker.propTypes = {
  containerElement: PropTypes.node.isRequired,
  mapElement: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultPosition: PropTypes.object.isRequired,
  zoom: PropTypes.number,
  radius: PropTypes.number,
  circleOptions: PropTypes.object
}

export default LocationPicker;
