'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGoogleMaps = require('react-google-maps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Create map with withGoogleMap HOC */
/* https://github.com/tomchentw/react-google-maps */

var Map = (0, _reactGoogleMaps.withGoogleMap)(function (props) {
  var position = props.position,
      defaultZoom = props.defaultZoom,
      handleMarkerDragEnd = props.handleMarkerDragEnd,
      onZoomChanged = props.onZoomChanged,
      radius = props.radius,
      circleOptions = props.circleOptions;


  var circle = radius !== -1 ? _react2.default.createElement(_reactGoogleMaps.Circle, {
    center: position,
    radius: radius,
    options: circleOptions
  }) : null;

  return _react2.default.createElement(
    _reactGoogleMaps.GoogleMap,
    {
      onZoomChanged: onZoomChanged,
      defaultZoom: defaultZoom,
      defaultCenter: position
    },
    _react2.default.createElement(_reactGoogleMaps.Marker, {
      draggable: true // Allow marker to drag
      , position: position,
      onDragEnd: handleMarkerDragEnd
    }),
    circle
  );
});

exports.default = Map;