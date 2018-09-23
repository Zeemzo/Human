import * as React from 'react';
import { Col, Grid, Thumbnail, Tab, Tabs, Button, ButtonToolbar, } from 'react-bootstrap';
import tumb from './thumbnail.png';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import withAuthorization from './withAuthorization';
import { HUMANBACKEND } from '../constants/routes';
import DisplayLoc from './DisplayLocation'

class Provision extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
      loading: true
    }
    console.log(this.props.type);

    console.log(localStorage.getItem('token'));
    const token = localStorage.getItem('token')
    axios
      .get(HUMANBACKEND + "/api/request/getall/" + new Date().toDateString() + "/" + this.props.type + "/", {
        headers: { 'Authorization': "bearer " + token }
      })
      .then(data => {
        this.setState({ loading: false });
        var obj = data.data;
        console.log(obj);
        var arr = [];
        for (var key in obj) {
          arr.push(obj[key]);
        }
        console.log(arr);
        this.setState({ needs: arr });


      })
      .catch((err) => { })



  }



  render() {
    return (

      <Grid>
        <ClipLoader
          // className={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
        />
        {this.state.needs.map((item, i) => (
          <Col xs={15} md={0} key={i}>
            <Thumbnail href="#" alt="171x180" src={tumb} />
            <span className="input-label">
              email: {item.email} | Type: {item.type} | Latitude: {item.latitude} | Longitude: {item.longitude}
            </span>
            <p>Description : {item.description}</p>
            
            <DisplayLoc latitude={item.latitude} longitude={item.longitude} />
          </Col>
        ))}
      </Grid>


    );
  }
}


const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Provision);
// export default Feed;
