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
      shouldRecenterMap: false,
      address:"",
      search:""
    };

    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeSuggestion = this.handleChangeSuggestion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { defaultPosition } = nextProps;
    if (
      JSON.stringify(defaultPosition) !==
      JSON.stringify(this.props.defaultPosition)
    ) {
      this.setState(
        { position: defaultPosition, shouldRecenterMap: true },
        () => {
          // Reverse geocode new default position
          this.geocodePosition(defaultPosition)
            .then(places => {
              this.notify(defaultPosition, places);
            })
            .catch(err => {
              console.error(err);
              this.notify(defaultPosition, []);
            });
        }
      );
    }
  }

  notify(position, places) {
    const { onChange } = this.props;
    const address = places.length > 0 ? places[0].formatted_address : '';

    const location = {
      position,
      places,
      address
    };

    this.setState({address,position});

    onChange && onChange(location);
  }
  /**
   * Handle Map marker position change
   * @param { MouseEvent } mouseEvent // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent
   */
  handleMarkerDragEnd(mouseEvent) {
    const { onChange } = this.props;
    // Get latitude and longitude
    const lat = mouseEvent.latLng.lat();
    const lng = mouseEvent.latLng.lng();
    const position = { lat, lng };
    this.setState({shouldRecenterMap: false, search:"" });
    this.geocodePosition(position)
      .then(places => {
        this.notify(position, places);
      })
      .catch(err => {
        console.error(err);
        this.notify(position, []);
      });
  }

  /**
   * Handle search box input change
   * @param { string } value
   */
  handleChangeInput(value){
    this.setState({address:value,search:value});
  }

  /**
   * Handle change the position by search box
   * @param { google.maps.GeocoderResult } suggestion // https://github.com/cedricdelpoux/react-google-places-suggest#props
   */
  handleChangeSuggestion(suggestion){
    const position = suggestion.geometry.location;

    this.setState({shouldRecenterMap:true,search:""});

    this.notify({lat:position.lat(),lng: position.lng()},[suggestion])
  }

  /**
   * Geocode position to places
   * @param { Object } position
   * @return { Promise }
   */
  geocodePosition(position) {
    // Geocoder instance
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
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
      containerElement,
      mapElement
    } = this.props;

    const { position, shouldRecenterMap, address, search } = this.state;


    return (
        <Map
          containerElement={containerElement}
          mapElement={mapElement}
          handleMarkerDragEnd={this.handleMarkerDragEnd}
          position={position}
          circleOptions={circleOptions}
          radius={radius}
          defaultZoom={zoom}
          zoom={zoom}
          shouldRecenterMap={shouldRecenterMap}
          onChangeInput={this.handleChangeInput}
          onChangeSuggestion={this.handleChangeSuggestion}
          address={address}
          search={search}
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
