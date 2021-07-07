import React,{Component} from "react";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import GoogleMap from "react-google-maps/lib/components/GoogleMap";
import Marker from "react-google-maps/lib/components/Marker";
import Circle from "react-google-maps/lib/components/Circle";
import SearchBox from "./SearchBox";
import CustomControl from "./CustomControl";
import { MAP } from "react-google-maps/lib/constants";

/* Create map with withGoogleMap HOC */
/* https://github.com/tomchentw/react-google-maps */

class Map extends Component { 

  constructor(props){
    super(props);

    // We are keeping mounted status in states.
    // Because we can not use useRef method. We are using react 15
    this.state = {
      mounted:false
    }
  }

  componentDidMount(){
    this.setState({mounted:true});
  }

  render(){
    const {
      position,
      defaultZoom,
      handleMarkerDragEnd,
      onZoomChanged,
      radius,
      circleOptions,
      shouldRecenterMap,
      zoom,
      onChangeInput,
      onChangeSuggestion,
      address,
      search
    } = this.props;

    const {mounted} = this.state;

    const circle =
      radius !== -1 ? (
        <Circle center={position} radius={radius} options={circleOptions} />
      ) : null;
    const mapExtraProps = shouldRecenterMap ? { center: position } : {};

    return (
      <GoogleMap
        onZoomChanged={onZoomChanged}
        defaultZoom={defaultZoom}
        defaultCenter={position}
        defaultOptions={{
          mapTypeControlOptions:{position:12},
          fullscreenControlOptions: {position:6}
        }}
        zoom={zoom}
        ref={map=>this._map=map}
        google={google}
        {...mapExtraProps}
      >
        <CustomControl mounted={mounted} position={3} map={this._map?this._map.context[MAP]:undefined}    >
            <SearchBox {...{onChangeInput,onChangeSuggestion,search,address}} />
        </CustomControl>
        {/* Map marker */}
        <Marker
          draggable // Allow marker to drag
          position={position}
          onDragEnd={handleMarkerDragEnd}
        />

        {/* Circle */}
        {circle}
      </GoogleMap>
    );
  }
}
;

export default withGoogleMap(Map);
