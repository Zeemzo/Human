import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Col, Grid, Thumbnail, Row, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";
import { HUMANBACKEND } from "../constants/routes";
import Fulfillment from "./fulfillment";
import MapContainer from './Multimap';
class ActiveFulfillments extends React.Component {
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
      .get(HUMANBACKEND + "/api/matchedRequest/getactivematches", {
        headers: {
          'Authorization': "bearer " + token,
          "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
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
          // className={override}
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
        
        {this.state.needs.map((item, i) => (
          <div>{!item.fulfilled ?
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
                    >Fulfill Request</Button>
                    <LinkContainer to='/chat'>
                      <Button>Chat</Button>
                    </LinkContainer>
                    <Fulfillment item={item} />

                  </Col>
                </Row>
              </Grid>

            </Thumbnail>
            : <h2>No ActiveFulfillments</h2>}
          </div>
        ))}
      </Grid>
    );
  }
}
///dont mistake the displayName, it has the user role data in it.
const authCondition = (authUser) => !!authUser && authUser.displayName === 'CONTRIBUTOR' || authUser.displayName === 'ADMIN';

export default withAuthorization(authCondition)(ActiveFulfillments);