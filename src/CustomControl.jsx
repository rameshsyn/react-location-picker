import { Component } from "react";
import { createPortal } from "react-dom";

/**
 * This Component for add custom control to map
 * (map.controls[position].push(component))
 * NOTE:
 * Can ref to map through context in constructor (or this.context expect contructor)
 * User constructor to add div and render will createPortal
 */
export default class MapControl extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      mounted: false
    };
  }

  componentDidUpdate() {
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

  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex);
  }

  render() {
    const { className } = this.props;

    if (!this.map) {
      return null;
    }

    className && this.controlDiv.classList.add(className);

    return createPortal(this.props.children, this.controlDiv);
  }
}
