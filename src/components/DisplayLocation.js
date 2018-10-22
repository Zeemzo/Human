import * as React from 'react'
import { createRef } from 'react'
import * as L from 'leaflet';
import withAuthorization from './withAuthorization';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


var greenIcon = L.icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconSize: [30, 30], // size of the icon
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

class DisplayLoc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLocation: false,
      latlng: {
        lat: this.props.latitude,
        lng: this.props.longitude,
      },
    }
  }



  mapRef = createRef()

  render() {
  
    return (
      <div>
        <Map
          center={this.state.latlng}
          length={4}
          ref={this.mapRef}
          zoom={13}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={this.state.latlng} icon={greenIcon}>
            <Popup>
              <span>Request is Here</span>
            </Popup>
          </Marker>      
          </Map>
      </div>
    )
  }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(DisplayLoc);