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
  }

  componentWillReceiveProps (nextProps) {
    const { defaultPosition } = nextProps;
    if (JSON.stringify(defaultPosition) !== JSON.stringify(this.props.defaultPosition))
      this.setState({ position: defaultPosition });
  }

  notify (position, address) {
    const { onChange } = this.props;
    const location = {
      position,
      address
    };
    onChange && onChange(location);
  }
  /**
   * Handle Map marker position change
   * @param { MouseEvent } mouseEvent // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent
   */
  handleMarkerDragEnd (mouseEvent) {
    const { onChange } = this.props;
    // Get latitude and longitude
    const lat = mouseEvent.latLng.lat();
    const lng = mouseEvent.latLng.lng();
    const position = { lat, lng };
    this.setState({ position });
    this.geocodePosition(position)
      .then(address => {
        this.notify(position, address);
      })
      .catch(err => {
        console.error(err);
        this.notify(position, "");
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
    const {
      zoom,
      radius,
      circleOptions,
      containerElement,
      mapElement
    } = this.props;

    const { position } = this.state;

    return (
      <Map
        containerElement={containerElement}
        mapElement={mapElement}
        handleMarkerDragEnd={this.handleMarkerDragEnd}
        position={position}
        circleOptions={circleOptions}
        radius={radius}
        defaultZoom={zoom}
      />
    );
  }
}

LocationPicker.propTypes = {
  containerElement: PropTypes.node.isRequired,
  mapElement: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultPosition: PropTypes.object.isRequired,
  zoom: PropTypes.number,
  radius: PropTypes.number,
  circleOptions: PropTypes.object
};

LocationPicker.defaultProps = {
  zoom: DEFAULT_ZOOM,
  radius: DEFAULT_RADIUS,
  circleOptions: DEFAULT_CIRCLE_OPTIONS
};

export default LocationPicker;
