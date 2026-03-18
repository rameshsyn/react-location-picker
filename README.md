# react-location-picker
> A react component to pick a location using google maps.

[Demo](https://react-location-picker.netlify.com/)

### Installation

```bash
npm install react-location-picker --save
```

This package now requires `@react-google-maps/api` as it is built on top of it.

### Google Maps API

You need to load the Google Maps JavaScript API. We recommend using the `LoadScript` component from `@react-google-maps/api`.

```jsx
import { LoadScript } from '@react-google-maps/api';

const libraries = ['geometry', 'drawing', 'places'];

<LoadScript
  googleMapsApiKey="YOUR_API_KEY_HERE"
  libraries={libraries}
>
  <YourApp />
</LoadScript>
```

Alternatively, you can include the script tag in your HTML:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=geometry,drawing,places"></script>
```

### Example

```jsx
import React, { useState } from 'react';
import LocationPicker from 'react-location-picker';

const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

const LocationPickerExample = () => {
  const [address, setAddress] = useState("Kala Pattar Ascent Trail, Khumjung 56000, Nepal");
  const [position, setPosition] = useState(defaultPosition);

  const handleLocationChange = ({ position, address }) => {
    // Set new location
    setPosition(position);
    setAddress(address);
  };

  return (
    <div>
      <h1>{address}</h1>
      <div>
        <LocationPicker
          defaultPosition={defaultPosition}
          onChange={handleLocationChange}
          mapContainerStyle={{ height: '400px', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default LocationPickerExample;
```

### Usage

#### LocationPicker Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `onChange` | `function` | **Required**. A callback which gets called on every map marker position change. It passes an object containing `position`, `address`, and `places`. |
| `defaultPosition` | `object` | **Required**. An object with `lat` and `lng` properties representing the initial map center and marker position. |
| `zoom` | `number` | *Optional*. Map zoom level. Default is `10`. |
| `radius` | `number` | *Optional*. Circle radius in meters. Pass `-1` to hide the circle. Default is `1000`. |
| `circleOptions` | `object` | *Optional*. [CircleOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions) for the radius circle. |
| `mapContainerStyle` | `object` | *Optional*. Style object for the map container. Default is `{ height: '400px', width: '100%' }`. |

### Development

For demo, clone this repo and run:

1. Install all dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open `http://localhost:8080` in your browser.
