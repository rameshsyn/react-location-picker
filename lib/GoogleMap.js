"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var api_1 = require("@react-google-maps/api");
var Map = function (_a) {
    var position = _a.position, zoom = _a.zoom, handleMarkerDragEnd = _a.handleMarkerDragEnd, radius = _a.radius, circleOptions = _a.circleOptions, shouldRecenterMap = _a.shouldRecenterMap, mapContainerStyle = _a.mapContainerStyle;
    var mapOptions = shouldRecenterMap ? { center: position } : {};
    return ((0, jsx_runtime_1.jsxs)(api_1.GoogleMap, __assign({ mapContainerStyle: mapContainerStyle, center: position, zoom: zoom }, mapOptions, { children: [(0, jsx_runtime_1.jsx)(api_1.Marker, { draggable: true, position: position, onDragEnd: handleMarkerDragEnd }), radius !== undefined && radius !== -1 && ((0, jsx_runtime_1.jsx)(api_1.Circle, { center: position, radius: radius, options: circleOptions }))] })));
};
exports.default = Map;
//# sourceMappingURL=GoogleMap.js.map