import React from "react";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import Icon from "./Search.svg";

const searchBoxStyles = {
  alignItems: "center",
  backgroundColor: "rgb(255, 255, 255)",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
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
  outline:"none",
  paddingBottom: "2px",
  paddingLeft: "16px",
  paddingRight: "12px",
  paddingTop: "2px",
  transitionDelay: "0s",
  transitionDuration: "0.3s",
  transitionProperty: "box-shadow",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  marginTop:14,
  marginRight:14,
  maxWidth: 310,
  minWidth: 280,
  WebkitFontSmoothing: "antialiased"
};

const SearchBox = (props) => (
    <label htmlFor="locationPickerSearch" style={searchBoxStyles}>
        <ReactGooglePlacesSuggest
          googleMaps={google.maps}
          autocompletionRequest={{ input: props.search }}
          onSelectSuggest={props.onChangeSuggestion}
        >
            <input
              type="text"
              id="locationPickerSearch"
              value={props.address}
              placeholder="Search a location"
              style={{border:"none",width:"100%",height:44}}
              onChange={e => {
                props.onChangeInput(e.target.value);
              }}
            />
        </ReactGooglePlacesSuggest>
        <Icon />
      </label>
)

export default SearchBox;