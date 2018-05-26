'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      circleOptions = props.circleOptions,
      shouldRecenterMap = props.shouldRecenterMap;


  var circle = radius !== -1 ? _react2.default.createElement(_reactGoogleMaps.Circle, {
    center: position,
    radius: radius,
    options: circleOptions
  }) : null;
  var mapExtraProps = shouldRecenterMap ? { center: position } : {};
  return _react2.default.createElement(
    _reactGoogleMaps.GoogleMap,
    _extends({
      onZoomChanged: onZoomChanged,
      defaultZoom: defaultZoom,
      defaultCenter: position
    }, mapExtraProps),
    _react2.default.createElement(_reactGoogleMaps.Marker, {
      draggable: true // Allow marker to drag
      , position: position,
      onDragEnd: handleMarkerDragEnd
    }),
    circle
  );
});

exports.default = Map;