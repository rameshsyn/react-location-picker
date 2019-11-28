'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GoogleMap = require('./GoogleMap');

var _GoogleMap2 = _interopRequireDefault(_GoogleMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * REACT LOCATION PICKER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var google = window.google;

/* Default configuration */
var DEFAULT_RADIUS = 1000;
var DEFAULT_ZOOM = 10;

/* Circle options */
// https://developers.google.com/maps/documentation/javascript/3.exp/reference#CircleOptions
var DEFAULT_CIRCLE_OPTIONS = {
  fillColor: 'red',
  fillOpacity: 0.2,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 1.2
};

var LocationPicker = function (_Component) {
  _inherits(LocationPicker, _Component);

  function LocationPicker(props) {
    _classCallCheck(this, LocationPicker);

    var _this = _possibleConstructorReturn(this, (LocationPicker.__proto__ || Object.getPrototypeOf(LocationPicker)).call(this, props));

    _this.state = {
      position: props.defaultPosition,
      shouldRecenterMap: false,
      address: "",
      search: ""
    };

    _this.handleMarkerDragEnd = _this.handleMarkerDragEnd.bind(_this);
    _this.handleChangeInput = _this.handleChangeInput.bind(_this);
    _this.handleChangeSuggestion = _this.handleChangeSuggestion.bind(_this);
    return _this;
  }

  _createClass(LocationPicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var defaultPosition = nextProps.defaultPosition;

      if (JSON.stringify(defaultPosition) !== JSON.stringify(this.props.defaultPosition)) {
        this.setState({ position: defaultPosition, shouldRecenterMap: true }, function () {
          // Reverse geocode new default position
          _this2.geocodePosition(defaultPosition).then(function (places) {
            _this2.notify(defaultPosition, places);
          }).catch(function (err) {
            console.error(err);
            _this2.notify(defaultPosition, []);
          });
        });
      }
    }
  }, {
    key: 'notify',
    value: function notify(position, places) {
      var onChange = this.props.onChange;

      var address = places.length > 0 ? places[0].formatted_address : '';

      var location = {
        position: position,
        places: places,
        address: address
      };

      this.setState({ address: address, position: position });

      onChange && onChange(location);
    }
    /**
     * Handle Map marker position change
     * @param { MouseEvent } mouseEvent // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent
     */

  }, {
    key: 'handleMarkerDragEnd',
    value: function handleMarkerDragEnd(mouseEvent) {
      var _this3 = this;

      var onChange = this.props.onChange;
      // Get latitude and longitude

      var lat = mouseEvent.latLng.lat();
      var lng = mouseEvent.latLng.lng();
      var position = { lat: lat, lng: lng };
      this.setState({ shouldRecenterMap: false, search: "" });
      this.geocodePosition(position).then(function (places) {
        _this3.notify(position, places);
      }).catch(function (err) {
        console.error(err);
        _this3.notify(position, []);
      });
    }

    /**
     * Handle search box input change
     * @param { string } value
     */

  }, {
    key: 'handleChangeInput',
    value: function handleChangeInput(value) {
      this.setState({ address: value, search: value });
    }

    /**
     * Handle change the position by search box
     * @param { google.maps.GeocoderResult } suggestion // https://github.com/cedricdelpoux/react-google-places-suggest#props
     */

  }, {
    key: 'handleChangeSuggestion',
    value: function handleChangeSuggestion(suggestion) {
      var position = suggestion.geometry.location;

      this.setState({ shouldRecenterMap: true, search: "" });

      this.notify({ lat: position.lat(), lng: position.lng() }, [suggestion]);
    }

    /**
     * Geocode position to places
     * @param { Object } position
     * @return { Promise }
     */

  }, {
    key: 'geocodePosition',
    value: function geocodePosition(position) {
      // Geocoder instance
      var geocoder = new google.maps.Geocoder();

      return new Promise(function (resolve, reject) {
        geocoder.geocode({ location: position }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            reject(status);
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          zoom = _props.zoom,
          radius = _props.radius,
          circleOptions = _props.circleOptions,
          containerElement = _props.containerElement,
          mapElement = _props.mapElement;
      var _state = this.state,
          position = _state.position,
          shouldRecenterMap = _state.shouldRecenterMap,
          address = _state.address,
          search = _state.search;


      return _react2.default.createElement(
        'div',
        { style: { position: "relative" } },
        _react2.default.createElement(_GoogleMap2.default, {
          containerElement: containerElement,
          mapElement: mapElement,
          handleMarkerDragEnd: this.handleMarkerDragEnd,
          position: position,
          circleOptions: circleOptions,
          radius: radius,
          defaultZoom: zoom,
          zoom: zoom,
          shouldRecenterMap: shouldRecenterMap,
          onChangeInput: this.handleChangeInput,
          onChangeSuggestion: this.handleChangeSuggestion,
          address: address,
          search: search
        })
      );
    }
  }]);

  return LocationPicker;
}(_react.Component);

LocationPicker.propTypes = {
  containerElement: _propTypes2.default.node.isRequired,
  mapElement: _propTypes2.default.node.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  defaultPosition: _propTypes2.default.object.isRequired,
  zoom: _propTypes2.default.number,
  radius: _propTypes2.default.number,
  circleOptions: _propTypes2.default.object
};

LocationPicker.defaultProps = {
  zoom: DEFAULT_ZOOM,
  radius: DEFAULT_RADIUS,
  circleOptions: DEFAULT_CIRCLE_OPTIONS
};

exports.default = LocationPicker;