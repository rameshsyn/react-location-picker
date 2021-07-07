"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _searchBoxStyles;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactGooglePlacesSuggest = require("react-google-places-suggest");

var _reactGooglePlacesSuggest2 = _interopRequireDefault(_reactGooglePlacesSuggest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Icon = function Icon(props) {
  return _react2.default.createElement(
    "svg",
    props,
    _react2.default.createElement("path", {
      fill: "#757575",
      d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    }),
    _react2.default.createElement("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    })
  );
};

Icon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};


var searchBoxStyles = (_searchBoxStyles = {
  alignItems: "center",
  backgroundColor: "rgb(255, 255, 255)",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
  boxSizing: "border-box",
  color: "rgba(0, 0, 0, 0.87)",
  display: "flex",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontSize: "14px",
  fontWeight: "400",
  height: "48px",
  letterSpacing: "0.14994px",
  lineHeight: "20.02px",
  marginTop: "0px",
  outline: "none",
  paddingBottom: "2px",
  paddingLeft: "16px",
  paddingRight: "12px",
  paddingTop: "2px",
  transitionDelay: "0s",
  transitionDuration: "0.3s",
  transitionProperty: "box-shadow",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
}, _defineProperty(_searchBoxStyles, "marginTop", 14), _defineProperty(_searchBoxStyles, "marginRight", 14), _defineProperty(_searchBoxStyles, "maxWidth", 310), _defineProperty(_searchBoxStyles, "minWidth", 280), _defineProperty(_searchBoxStyles, "WebkitFontSmoothing", "antialiased"), _searchBoxStyles);

var SearchBox = function SearchBox(props) {
  return _react2.default.createElement(
    "label",
    { htmlFor: "locationPickerSearch", style: searchBoxStyles },
    _react2.default.createElement(
      _reactGooglePlacesSuggest2.default,
      {
        googleMaps: google.maps,
        autocompletionRequest: { input: props.search },
        onSelectSuggest: props.onChangeSuggestion
      },
      _react2.default.createElement("input", {
        type: "text",
        id: "locationPickerSearch",
        value: props.address,
        placeholder: "Search a location",
        style: { border: "none", width: "100%", height: 44 },
        onChange: function onChange(e) {
          props.onChangeInput(e.target.value);
        }
      })
    ),
    _react2.default.createElement(Icon, null)
  );
};

exports.default = SearchBox;