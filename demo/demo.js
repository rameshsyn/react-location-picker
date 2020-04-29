/*
  Example
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LocationPicker from '../lib';
import {GoogleMap} from "@react-google-maps/api";

/* Default position */
const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

/* Map options (https://developers.google.com/maps/documentation/javascript/controls) */
const mapOptions = {
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false
}

class LocationPickerExample extends Component {
  constructor (props) {
    super(props);

    this.state = {
      address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
      position: {},
      defaultPosition: defaultPosition
    };

    // Bind
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange ({ position, address }) {

    // Set new location
    this.setState({ position, address });
  }

  componentDidMount () {
    navigator && navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        defaultPosition: {
          lat: latitude,
          lng: longitude
        }
      });
    });
  }

  render () {
    return (
      <div>
        <a href="https://github.com/rameshsyn/react-location-picker#example">Example</a>&nbsp;&nbsp;&nbsp;
        <a href="https://github.com/rameshsyn/react-location-picker#usage">Usage</a>
        <h1>{this.state.address}</h1>
        <div>
          <LocationPicker
            mapContainerStyle={{height: '200px', width: '400px'}}
            defaultPosition={this.state.defaultPosition}
            radius={-1}
            onChange={this.handleLocationChange}
            mapOptions={mapOptions}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<LocationPickerExample />, document.getElementById('root'));
