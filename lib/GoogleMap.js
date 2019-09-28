'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withGoogleMap = require('react-google-maps/lib/withGoogleMap');

var _withGoogleMap2 = _interopRequireDefault(_withGoogleMap);

var _GoogleMap = require('react-google-maps/lib/components/GoogleMap');

var _GoogleMap2 = _interopRequireDefault(_GoogleMap);

var _Marker = require('react-google-maps/lib/components/Marker');

var _Marker2 = _interopRequireDefault(_Marker);

var _Circle = require('react-google-maps/lib/components/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Create map with withGoogleMap HOC */
/* https://github.com/tomchentw/react-google-maps */

var Map = (0, _withGoogleMap2.default)(function (props) {
  var position = props.position,
      defaultZoom = props.defaultZoom,
      handleMarkerDragEnd = props.handleMarkerDragEnd,
      onZoomChanged = props.onZoomChanged,
      radius = props.radius,
      circleOptions = props.circleOptions,
      shouldRecenterMap = props.shouldRecenterMap,
      zoom = props.zoom;


  var circle = radius !== -1 ? _react2.default.createElement(_Circle2.default, {
    center: position,
    radius: radius,
    options: circleOptions
  }) : null;
  var mapExtraProps = shouldRecenterMap ? { center: position } : {};
  return _react2.default.createElement(
    _GoogleMap2.default,
    _extends({
      onZoomChanged: onZoomChanged,
      defaultZoom: defaultZoom,
      defaultCenter: position,
      zoom: zoom
    }, mapExtraProps),
    _react2.default.createElement(_Marker2.default, {
      draggable: true // Allow marker to drag
      , position: position,
      onDragEnd: handleMarkerDragEnd
    }),
    circle
  );
});

exports.default = Map;