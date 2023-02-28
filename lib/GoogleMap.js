"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _withGoogleMap = require("react-google-maps/lib/withGoogleMap");

var _withGoogleMap2 = _interopRequireDefault(_withGoogleMap);

var _GoogleMap = require("react-google-maps/lib/components/GoogleMap");

var _GoogleMap2 = _interopRequireDefault(_GoogleMap);

var _Marker = require("react-google-maps/lib/components/Marker");

var _Marker2 = _interopRequireDefault(_Marker);

var _Circle = require("react-google-maps/lib/components/Circle");

var _Circle2 = _interopRequireDefault(_Circle);

var _SearchBox = require("./SearchBox");

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _CustomControl = require("./CustomControl");

var _CustomControl2 = _interopRequireDefault(_CustomControl);

var _constants = require("react-google-maps/lib/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Create map with withGoogleMap HOC */
/* https://github.com/tomchentw/react-google-maps */

var Map = function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));

    _this.state = {
      mounted: false
    };
    return _this;
  }

  _createClass(Map, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({ mounted: true });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          position = _props.position,
          defaultZoom = _props.defaultZoom,
          handleMarkerDragEnd = _props.handleMarkerDragEnd,
          onZoomChanged = _props.onZoomChanged,
          radius = _props.radius,
          circleOptions = _props.circleOptions,
          shouldRecenterMap = _props.shouldRecenterMap,
          zoom = _props.zoom,
          onChangeInput = _props.onChangeInput,
          onChangeSuggestion = _props.onChangeSuggestion,
          address = _props.address,
          search = _props.search;
      var mounted = this.state.mounted;


      var circle = radius !== -1 ? _react2.default.createElement(_Circle2.default, { center: position, radius: radius, options: circleOptions }) : null;
      var mapExtraProps = shouldRecenterMap ? { center: position } : {};

      return _react2.default.createElement(
        _GoogleMap2.default,
        _extends({
          onZoomChanged: onZoomChanged,
          defaultZoom: defaultZoom,
          defaultCenter: position,
          defaultOptions: {
            mapTypeControlOptions: { position: 12 },
            fullscreenControlOptions: { position: 6 }
          },
          zoom: zoom,
          ref: function ref(map) {
            return _this2._map = map;
          },
          google: google
        }, mapExtraProps),
        _react2.default.createElement(
          _CustomControl2.default,
          { mounted: mounted, position: 3, map: this._map ? this._map.context[_constants.MAP] : undefined },
          _react2.default.createElement(_SearchBox2.default, { onChangeInput: onChangeInput, onChangeSuggestion: onChangeSuggestion, search: search, address: address })
        ),
        _react2.default.createElement(_Marker2.default, {
          draggable: true // Allow marker to drag
          , position: position,
          onDragEnd: handleMarkerDragEnd
        }),
        circle
      );
    }
  }]);

  return Map;
}(_react.Component);

;

exports.default = (0, _withGoogleMap2.default)(Map);