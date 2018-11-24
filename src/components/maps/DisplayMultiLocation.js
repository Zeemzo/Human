import * as React from 'react'
import { createRef } from 'react'
import * as L from 'leaflet';
// import { render } from 'react-dom'
import withAuthorization from '../authentication/withAuthorization';
// import { withRouter } from 'react-router-dom';


import { Map, Marker, Popup, TileLayer ,Polyline} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
// import Routing from './components/routing'

var greenIcon = L.icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconSize: [30, 30], // size of the icon
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

class DisplayMultiLoc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLocation: false,
      needy: this.props.needyLoc,
      giver: this.props.giverLoc,
      poly:[this.props.giverLoc,this.props.needyLoc]
    }
  }


  mapRef = createRef()


  // componentDidMount(){
  //   this.mapRef.current.leafletElement.locate()


  // }
  // handleClick = () => {
  //   this.props.latitude = this.state.latlng.lat;
  //   this.props.longitude = this.state.latlng.lng;
  //   // withRouter(AddRequest);
  // }



  // handleLocationFound = e => {
  //   this.setState({
  //     hasLocation: true,
  //     latlng: e.latlng,
  //   })

  // }
  render() {
    // const marker = this.state.hasLocation ? (

    // ) : null

    return (
      <div>
        <Map
          center={this.state.needy}
          length={4}
          // onClick={this.handleClick}
          // onLocationfound={this.handleLocationFound}
          ref={this.mapRef}
          zoom={10}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={this.state.needy} icon={greenIcon}>
            <Popup>
              <span>Needy</span>
            </Popup>
          </Marker>     
         <Marker position={{lat:7,lng:79.86449859999999}} icon={greenIcon}>
            <Popup>
              <span>Giver</span>
            </Popup>
          </Marker> 
          {/* <RoutingMachine from={[7,79.86449859999999]} to={[57.6792, 11.949]}  /> */}
          {/* <Polyline latlngs={this.state.poly} ></Polyline>       */}
          </Map>
        {/* <button onClick={this.handleClick} >locate me</button> */}
      </div>
    )
  }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(DisplayMultiLoc);