import React from 'react';
import { Col, Grid, Thumbnail, Row,  Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";
import { HUMANBACKEND } from "../constants/routes";
import Trigger2 from "./ContributorGroupChat";
import MapContainer from './Multimap';
class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      needs: [],
      loading: true
    };
    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.setState({ show: false });
  }


  componentDidMount() {
    console.log(localStorage.getItem('token'));
    const token = localStorage.getItem('token')

    axios
      .get(HUMANBACKEND + "/api/matchedRequest/getmatches", {
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
        this.setState({ needs: arr });
      })
      .catch((err) => { })

  }

  render() {
    return (
      <Grid>
        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
            {this.state.needs.length==0 && !this.state.loading? 
         <h2>No Matched Requests Available</h2> : <div>
        {this.state.needs.map((item, i) => (
          <Thumbnail key={i}>
            <Grid>
              <Row>
                <Col >
                  
                  <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}

                  >
                    <Modal.Header closeButton />
                    <Modal.Body>

                      <MapContainer needyLoc={item.needyLoc}
                        giverLoc={item.giverLoc} />


                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                  </Modal>

                </Col>
                <Col xs={7} md={4} lg={5}>
                  <h3>Request ID: {item.matchId}</h3>
                  <p>

                    <span className="input-label">
                    Resource Type: {item.need.resourceType}
                      <br />
                      From: {item.giverEmail}
                      <br />
                      To: {item.needyEmail}
                      <br />
                    </span>
                  </p>
                  <Button
                    bsStyle="success"
                    bsSize="medium"
                    onClick={() => this.setState({ show: true })}
                  >View Route</Button> 
                  <Trigger2 item={item} />
                </Col>
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
///dont mistake the displayName, it has the user role data in it.
const authCondition = (authUser) => !!authUser && authUser.displayName === 'CONTRIBUTOR' || authUser.displayName === 'ADMIN';

export default withAuthorization(authCondition)(Matches);