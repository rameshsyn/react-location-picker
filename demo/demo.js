/*
  Example
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LocationPicker from '../lib';

/* Default position */
const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

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
            containerElement={ <div style={ {height: '100%'} } /> }
            mapElement={ <div style={ {height: '400px'} } /> }
            defaultPosition={this.state.defaultPosition}
            radius={-1}
            onChange={this.handleLocationChange}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<LocationPickerExample />, document.getElementById('root'));
