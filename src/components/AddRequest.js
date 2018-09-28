// import { Col, Grid, Thumbnail } from 'react-bootstrap';
import React, { Component } from "react";
import withAuthorization from "./withAuthorization";
import { firebase } from "../firebase/index";
import axios from "axios";
import { HUMANBACKEND } from "../constants/routes";
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from "react-bootstrap";
import Mappy from "./map";
import Cam from "./camera";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  resourceType: "",
  description: "",
  email: "",
  latitude: null,
  longitude: null,
  status: false,
  requestType: "",
  image: "",
  error: null
};

class AddRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  componentDidMount() {
    var user = firebase.auth.currentUser;
    if (user) {
      this.setState(byPropKey("email", user.email));
    }
  }
  onSubmit = event => {
    // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZWVtYXNocmFmQG91dGxvb2suY29tIiwiaWF0IjoxNTM3NjE2Mjk4fQ.RWrfOXSu7i3YnCjb1LfCz1ws4_L5bujeYg19PQKon9s";
    //    console.log(this.state);
    const token = localStorage.getItem("token");
    // console.log(this.state);
    axios
      .post(HUMANBACKEND + "/api/request/add", this.state, {
        headers: { Authorization: "bearer " + token }
      })
      .then(res => {
        console.log(res.data);
        // this.setState(byPropKey('error', res))
      })
      .catch(error => {
        console.log(error);
        // this.setState(byPropKey('error', error.message))
      });

    event.preventDefault();
  };
  handleLoc = (lat, lon) => {
    this.setState({ latitude: lat, longitude: lon });
  };

  handleImage = DataUrl => {
    this.setState({ image: DataUrl });
  };

  render() {
    const { resourceType, requestType, description, error } = this.state;

    const isInvalid =
      resourceType === "" || requestType === "" || description === "";

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        {/* <input
                    value={resourceType}
                    onChange={event => this.setState(byPropKey('resourceType', event.target.value))}
                    type="text"
                    placeholder="Resource Type"
                /><br /> */}
        <h1>ADD REQUEST</h1>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={2}>
            Resource Type
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              componentClass="select"
              placeholder="Resource Type"
              onChange={event =>
                this.setState(byPropKey("resourceType", event.target.value))
              }
            >
              <option value="">Select Resource Type</option>
              <option value="Food">food</option>
              <option value="Clothing">clothing</option>
              <option value="Other">other</option>
            </FormControl>
          </Col>
        </FormGroup>
        {/* <input
                    value={requestType}
                    onChange={event => this.setState(byPropKey('requestType', event.target.value))}
                    type="text"
                    placeholder="Request Type"
                /> */}
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={2}>
            Request Type
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              componentClass="select"
              placeholder="Request Type"
              value={requestType}
              onChange={event =>
                this.setState(byPropKey("requestType", event.target.value))
              }
            >
              <option value="">Select Request Type</option>
              <option value="Need">need</option>
              <option value="Provision">provision</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              value={description}
              onChange={event =>
                this.setState(byPropKey("description", event.target.value))
              }
              componentClass="textarea"
              placeholder="Description"
            />
          </Col>
        </FormGroup>

        {/* <textarea
          value={description}
          onChange={event =>
            this.setState(byPropKey("description", event.target.value))
          }
          type="text"
          placeholder="Description"
        /> */}
        <br />

        <FormGroup>
          <Col xs={12} md={8}>
            <Mappy loc={this.handleLoc} />
          </Col>
        </FormGroup>
        <Cam DataUrl={this.handleImage} />
        <br />
        <Button disabled={isInvalid} type="submit">
          Submit
        </Button>

        <h1> {error && <p>{error.message}</p>}</h1>
      </Form>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(AddRequest);
