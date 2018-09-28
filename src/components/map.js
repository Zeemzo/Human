import * as React from "react";
import { createRef } from "react";
import * as L from "leaflet";
// import { render } from 'react-dom'
import withAuthorization from "./withAuthorization";
// import { withRouter } from 'react-router-dom';
import { Row, Col, Grid, Thumbnail, Panel, Button } from "react-bootstrap";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import AddRequest from './AddRequest';
// import { LatLngLiteral } from '../../../node_modules/@types/leaflet';
// import { Map, TileLayer, Marker, Popup } from '../../src'

var greenIcon = L.icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [30, 30], // size of the icon
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

class Mappy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLocation: false,
      latlng: {
        lat: 0,
        lng: 0
      }
    };
  }

  mapRef = createRef();

  // componentDidMount() {
  //     this.mapRef.current.leafletElement.locate()

  // }
  handleClick = event => {
    this.mapRef.current.leafletElement.locate();
    event.preventDefault();
  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
    this.props.loc(this.state.latlng.lat, this.state.latlng.lng);
  };
  render() {
    return (
      <div>
        <Grid>
          <Map
            center={this.state.latlng}
            length={4}
            // onClick={this.handleClick}
            onLocationfound={this.handleLocationFound}
            ref={this.mapRef}
            zoom={13}
          >
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={this.state.latlng} icon={greenIcon}>
              <Popup>
                <span>You are here</span>
              </Popup>
            </Marker>{" "}
          </Map>
          <Button onClick={this.handleClick}>locate me</Button>
        </Grid>
      </div>
    );
  }
}
const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Mappy);
