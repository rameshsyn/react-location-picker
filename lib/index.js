"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var GoogleMap_1 = __importDefault(require("./GoogleMap"));
var DEFAULT_RADIUS = 1000;
var DEFAULT_ZOOM = 10;
var DEFAULT_CIRCLE_OPTIONS = {
    fillColor: 'red',
    fillOpacity: 0.2,
    strokeColor: 'red',
    strokeOpacity: 1,
    strokeWeight: 1.2
};
var LocationPicker = function (_a) {
    var onChange = _a.onChange, defaultPosition = _a.defaultPosition, _b = _a.zoom, zoom = _b === void 0 ? DEFAULT_ZOOM : _b, _c = _a.radius, radius = _c === void 0 ? DEFAULT_RADIUS : _c, _d = _a.circleOptions, circleOptions = _d === void 0 ? DEFAULT_CIRCLE_OPTIONS : _d, _e = _a.mapContainerStyle, mapContainerStyle = _e === void 0 ? { height: '400px', width: '100%' } : _e;
    var _f = (0, react_1.useState)(defaultPosition), position = _f[0], setPosition = _f[1];
    var _g = (0, react_1.useState)(false), shouldRecenterMap = _g[0], setShouldRecenterMap = _g[1];
    var notify = (0, react_1.useCallback)(function (pos, places) {
        var location = {
            position: pos,
            places: places,
            address: places.length > 0 ? places[0].formatted_address : ''
        };
        onChange && onChange(location);
    }, [onChange]);
    var geocodePosition = (0, react_1.useCallback)(function (pos) {
        if (typeof google === 'undefined') {
            return Promise.reject(new Error('Google Maps API not loaded'));
        }
        var geocoder = new google.maps.Geocoder();
        return new Promise(function (resolve, reject) {
            geocoder.geocode({ location: pos }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results) {
                    resolve(results);
                }
                else {
                    reject(status);
                }
            });
        });
    }, []);
    var handleMarkerDragEnd = (0, react_1.useCallback)(function (mouseEvent) {
        if (!mouseEvent.latLng)
            return;
        var lat = mouseEvent.latLng.lat();
        var lng = mouseEvent.latLng.lng();
        var newPos = { lat: lat, lng: lng };
        setPosition(newPos);
        setShouldRecenterMap(false);
        geocodePosition(newPos)
            .then(function (places) { return notify(newPos, places); })
            .catch(function (err) {
            console.error(err);
            notify(newPos, []);
        });
    }, [geocodePosition, notify]);
    // Handle defaultPosition changes
    (0, react_1.useEffect)(function () {
        setPosition(defaultPosition);
        setShouldRecenterMap(true);
        geocodePosition(defaultPosition)
            .then(function (places) { return notify(defaultPosition, places); })
            .catch(function (err) {
            // Silently fail or log if geocoding fails on initial load
            notify(defaultPosition, []);
        });
    }, [defaultPosition.lat, defaultPosition.lng, geocodePosition, notify]);
    return ((0, jsx_runtime_1.jsx)(GoogleMap_1.default, { mapContainerStyle: mapContainerStyle, handleMarkerDragEnd: handleMarkerDragEnd, position: position, circleOptions: circleOptions, radius: radius, zoom: zoom, shouldRecenterMap: shouldRecenterMap }));
};
exports.default = LocationPicker;
//# sourceMappingURL=index.js.map