import * as React from 'react';
import { Col, Grid, Thumbnail, Tab, Tabs,Button,ButtonToolbar, } from 'react-bootstrap';
import tumb from './thumbnail.png';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import withAuthorization from './withAuthorization';
import { HUMANBACKEND } from '../constants/routes';
// import store from '../store/index'

class Need extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
      loading: true
    }

    console.log(localStorage.getItem('token'));
    const token = localStorage.getItem('token')
    axios
      .get(HUMANBACKEND + "/api/request/getall/" + new Date().toDateString() + "/need/", {
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
              <Col xs={3} md={5} key={i}>
                <Thumbnail href="#" alt="171x180" src={tumb} />
                <span className="input-label">
                  email: {item.email} | Type: {item.type} | Latitude: {item.latitude} | Longitude: {item.longitude}
                </span>
                <p>Description : {item.description}</p>

              </Col>
            ))}
          </Grid>


    );
  }
}


const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Need);
// export default Feed;
