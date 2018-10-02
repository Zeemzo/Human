import { createRef } from 'react'

import React from 'react'
import L from 'leaflet'
import { Map, Marker, Popup, TileLayer,MapLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import Routing from './tracker'
import RoutingMachine from './tracker'

export default class KAKA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 51.505,
      lng: -0.09, // London
      zoom: 13
    }
    // this.mapRef=this.mapRef.bind(this)
  }

  // mapRef = createRef()


render() {
  const { lat, lng, zoom } = this.state

  const position = [lat, lng]
  var markerIcon = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
  });

  return (
    <div>
      <Map RoutingMachine center={position} zoom={zoom}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={position} icon={markerIcon}>
          <Popup>
            <span>A pretty CSS3 popup.<br />Easily customizable.</span>
          </Popup>
        </Marker>
        {/* <RoutingMachine /> */}
        <Routing from={[57.74, 11.94]} to={[57.6792, 11.949]} map={Map} />
      </Map>
    </div>
  )
}
}
