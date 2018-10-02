import React from 'react';

import AuthUserContext from './AuthUserContext';

import { Col, Grid, Thumbnail, Panel, Row, Image } from "react-bootstrap";
// import tumb from './thumbnail.png';
import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";
import { HUMANBACKEND } from "../constants/routes";
import DisplayMultiLoc from "./DisplayMultiLocation";
import Trigger from "./Trigger";
import RoutingMachine from './tracker';
class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
      loading: true
    };
    // console.log(this.props.type);
  }
componentDidMount(){
  console.log(localStorage.getItem('token'));
    const token = localStorage.getItem('token')
    const now = new Date;

    const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    axios
      .get(HUMANBACKEND + "/api/matchedRequest/getmatches" , {
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
        arr=arr.reverse();

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
          color={"#123abc"}
          loading={this.state.loading}
        />
        {this.state.needs.map((item, i) => (
          <Thumbnail key={i}>
            <Grid>
              <Row>
                <Col xs={7} md={4} lg={5}>
                <DisplayMultiLoc
                      needyLoc={item.needyLoc}
                      giverLoc={item.giverLoc}
                    />
                    {/* <RoutingMachine /> */}

                    {/* <Map/> */}
                </Col>
                <Col xs={7} md={4} lg={5}>
                  <h3>Request ID: {item.matchId}</h3>
                  <p>
                    
                    <span className="input-label">
                      needy: {item.needy}
                      <br />
                      giver: {item.giver}
                      <br />
                  </span>
                  </p>
                </Col>
              </Row>
            </Grid>
          </Thumbnail>
        ))}
      </Grid>
    );
  }
}
  ///dont mistake the displayName, it has the user role data in it.
const authCondition = (authUser) => !!authUser && authUser.displayName === 'CONTRIBUTOR'||authUser.displayName === 'ADMIN' ;

export default withAuthorization(authCondition)(Matches);