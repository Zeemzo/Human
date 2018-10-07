import React, { Component } from 'react';
import L from 'leaflet';
// postCSS import of Leaflet's CSS
import 'leaflet/dist/leaflet.css';
// using webpack json loader we can import our geojson file like this
// import geojson from './bk_subway_entrances.json';
// import local components Filter and ForkMe


// import Filter from './Filter';
// import ForkMe from './ForkMe';

const map=L.map()

L.Routing.control({
  waypoints: [
      L.latLng(57.74, 11.94),
      L.latLng(57.6792, 11.949)
  ],
  routeWhileDragging: true,
  geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}

map.on('click', function(e) {
  var container = L.DomUtil.create('div'),
      startBtn = createButton('Start from this location', container),
      destBtn = createButton('Go to this location', container);

  L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);
});
// store the map configuration properties in an object,
// we could also move this to a separate file & import it if desired.
let config = {};
config.params = {
  center: [40.655769,-73.938503],
  zoomControl: false,
  zoom: 13,
  maxZoom: 19,
  minZoom: 11,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};
config.tileLayer = {
  uri: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
  params: {
    minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
};

// array to store unique names of Brooklyn subway lines,
// this eventually gets passed down to the Filter component

class Map extends Component {
 

  render() {
    
    return (
     <h1></h1>
    );
  }
}

export default Map;
