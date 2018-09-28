import * as React from 'react';
import { Col, Grid, Thumbnail, Panel } from 'react-bootstrap';
// import tumb from './thumbnail.png';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import withAuthorization from './withAuthorization';
import { HUMANBACKEND } from '../constants/routes';
import DisplayLoc from './DisplayLocation';
import Trigger from './Trigger';
// import { Button, Modal } from 'react-bootstrap';

class Provision extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
      loading: true
    }
    // console.log(this.props.type);

  



  }

  componentDidMount(){
    console.log(localStorage.getItem('token'));
    const token = localStorage.getItem('token')
    const now = new Date;

    const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    axios
      .get(HUMANBACKEND + "/api/request/getall/" + utc_timestamp + "/provision/", {
        headers: { 'Authorization': "bearer " + token,"Content-Type": "application/json",'Access-Control-Allow-Origin':'*',
      }
      })
      .then(data => {
        this.setState({ loading: false });
        var obj = data.data;
        // console.log(obj);
        var arr = [];
        for (var key in obj) {
          obj[key].id = key;
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
          <Panel key={i}>
            <Panel.Heading>Request ID: {item.id}</Panel.Heading>
            <Panel.Body>
              <Col xs={15} md={0}>
                <Thumbnail href="#" alt="171x180" src={item.image} />

                {/* <DisplayLoc latitude={item.latitude} longitude={item.longitude} /> */}
                <span className="input-label">
                  email: {item.email} | Type: {item.type} | Latitude: {item.latitude} | Longitude: {item.longitude}
                </span>
                <p>Description : {item.description}</p>
                  <Trigger item={item}/>
              </Col>
            </Panel.Body>
          </Panel>
        ))}
      </Grid>


    );
  }
}


const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Provision);
// export default Feed;
