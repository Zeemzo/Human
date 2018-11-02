import * as React from "react";
import { Col, Grid, Thumbnail, Panel, Row, Image } from "react-bootstrap";
// import tumb from './thumbnail.png';
import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";
import { HUMANBACKEND } from "../constants/routes";
import DisplayLoc from "./DisplayLocation";
import Trigger from "./Trigger";
import { auth } from '../firebase/firebase'
class Accepted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
      loading: true
    };

  }
  componentDidMount() {

    if (navigator.onLine) {
      console.log(localStorage.getItem('token'));
      const token = localStorage.getItem('token')
      const now = new Date;

      const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
      axios
        .get(HUMANBACKEND + "/api/request/accepted/" + auth.currentUser.uid , {
          headers: {
            'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
          }
        })
        .then(data => {
          this.setState({ loading: false });
          var obj = data.data;
          var arr = [];
          for (var key in obj) {
            obj[key].id = key;
            arr.push(obj[key]);
          }
          arr = arr.reverse();

          console.log(arr);
          localStorage.setItem(this.props.type, JSON.stringify(arr))
          this.setState({ needs: arr });
        })
        .catch((err) => { })
    }else{

      this.setState({ loading: false });
      var arr=JSON.parse(localStorage.getItem(this.props.type))
      if(arr!=null){
        this.setState({ needs: arr });

      }
    }


  }

  render() {
    return (
      <Grid>
        <Grid><Row><Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
          // style={override}
          sizeUnit={"px"}
          size={100}
          color={"green"}
          loading={this.state.loading}
        // style="text-align:center"
        /></p></Col></Row></Grid>
        {this.state.needs.length == 0 && !this.state.loading ?
          <h2>No {this.props.type} Requests</h2> : <div>
            {this.state.needs.map((item, i) => (
              <Thumbnail key={i}>
                <Grid>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <h3>Request ID: {item.id}</h3>
                    </Col>
                    {item.image != "" ? <div>
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <p>
                          <span className="input-label">

                            Type: {item.requestType}
                            <br />
                            email: {item.email}
                            <br />
                            Resource: {item.resourceType}
                            <br />
                            Servings: {item.quantity}
                            <br />
                          </span>
                          <p>Description : {item.description}</p>
                        </p>
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <Image width="250" src={item.image} rounded />
                        <DisplayLoc latitude={item.latitude} longitude={item.longitude} />

                      </Col></div> :
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <p>
                          <span className="input-label">

                            Type: {item.requestType}
                            <br />
                            email: {item.email}
                            <br />
                            Resource: {item.resourceType}
                            <br />
                            Servings: {item.quantity}
                            <br />
                          </span>
                          <p>Description : {item.description}</p>
                        </p>
                        <DisplayLoc latitude={item.latitude} longitude={item.longitude} />

                      </Col>
                    }
                  </Row>
                </Grid>
              </Thumbnail>

            ))}
          </div>
        }
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Accepted);
    // export default Feed;
