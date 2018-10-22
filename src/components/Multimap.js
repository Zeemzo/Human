import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Routing from './Routing';

class MapContainer extends Component {
constructor(props)
{
super(props)
this.state={
  latlng:null,
  canRoute:false
}
this.handleLocationFound=this.handleLocationFound.bind(this)
}

componentDidMount(){
  this.map.leafletElement.locate();
}
  handleLocationFound = e => {
    this.setState({
      latlng: e.latlng,
      canRoute:true
    });
  };
  render() {
    return (
      <Map
      onLocationfound={this.handleLocationFound}

       center={this.state.latlng} zoom={13} ref={map => this.map = map}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />{
          this.state.canRoute?<Routing height={300} map={this.map} latlng={this.state.latlng} 
          needyLoc={this.props.needyLoc}
          giverLoc={this.props.giverLoc} />:null
        }
        
      </Map>
    );
  }
}

MapContainer.propTypes = {};
MapContainer.defaultProps = {};

export default MapContainer;