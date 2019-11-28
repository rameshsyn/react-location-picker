"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _reactDom = require("react-dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This Component for add custom control to map
 * (map.controls[position].push(component))
 * NOTE:
 * Can ref to map through context in constructor (or this.context expect contructor)
 * User constructor to add div and render will createPortal
 */
var MapControl = function (_Component) {
  _inherits(MapControl, _Component);

  function MapControl(props, context) {
    _classCallCheck(this, MapControl);

    var _this = _possibleConstructorReturn(this, (MapControl.__proto__ || Object.getPrototypeOf(MapControl)).call(this, props));

    _this.state = {
      mounted: false
    };
    return _this;
  }

  _createClass(MapControl, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.map && !this.map) {
        this.map = this.props.map;
        this.controlDiv = document.createElement("div");
        this.divIndex = this.map.controls[this.props.position].length;
        this.map.controls[this.props.position].push(this.controlDiv);

        this.setState({
          mounted: true
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.map.controls[this.props.position].removeAt(this.divIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.props.className;


      if (!this.map) {
        return null;
      }

      className && this.controlDiv.classList.add(className);

      return (0, _reactDom.createPortal)(this.props.children, this.controlDiv);
    }
  }]);

  return MapControl;
}(_react.Component);

exports.default = MapControl;