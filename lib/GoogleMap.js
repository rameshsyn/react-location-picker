'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('@react-google-maps/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Map(props) {
  var position = props.position,
      defaultZoom = props.defaultZoom,
      handleMarkerDragEnd = props.handleMarkerDragEnd,
      onZoomChanged = props.onZoomChanged,
      radius = props.radius,
      circleOptions = props.circleOptions,
      shouldRecenterMap = props.shouldRecenterMap,
      zoom = props.zoom,
      mapContainerStyle = props.mapContainerStyle,
      mapOptions = props.mapOptions;


  var mapExtraProps = shouldRecenterMap ? { center: position } : {};

  return _react2.default.createElement(
    _api.GoogleMap,
    _extends({
      options: mapOptions,
      mapContainerStyle: mapContainerStyle,
      onZoomChanged: onZoomChanged,
      defaultZoom: defaultZoom,
      zoom: zoom,
      center: position
    }, mapExtraProps),
    _react2.default.createElement(_api.Marker, {
      draggable: true // Allow marker to drag
      , position: position,
      onDragEnd: handleMarkerDragEnd
    }),
    radius !== -1 && _react2.default.createElement(_api.Circle, {
      center: position,
      radius: radius,
      options: circleOptions
    })
  );
}

exports.default = Map;