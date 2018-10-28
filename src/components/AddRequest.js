import React, { Component } from "react";
import withAuthorization from "./withAuthorization";
import { firebase } from "../firebase/index";
import axios from "axios";
import AuthUserContext from './AuthUserContext';
import { HUMANBACKEND, HUMANAPP } from "../constants/routes";
import { ToastContainer, ToastStore } from 'react-toasts';

import {
  Grid,
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from "react-bootstrap";
import Mappy from "./map";
import ModalCamera from "./ModalCamera";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});


const INITIAL_STATE = {
  title: "",
  resourceType: "",
  description: "",
  email: "",
  userId: '',
  latitude: null,
  longitude: null,
  status: false,
  fulfilled: false,
  matched: false,
  quantity: null,
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
      this.setState(byPropKey('email', user.email))
      this.setState(byPropKey('userId', user.uid))

    }
  }
  onSubmit = (event) => {

    if (navigator.onLine) {
      const token = localStorage.getItem('token')
      axios
        .post(HUMANBACKEND + '/api/request/add', this.state, {
          headers: {
            'Authorization': "bearer " + token,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
          }
        })
        .then((res) => {
          console.log(res.data);
          this.setState(byPropKey('error', "Request Added!!"))
          // this.setState({...INITIAL_STATE})
          ToastStore.success("Request Added!!")
          // window.alert( "Request Added!!");        
          // event.preventDefault();

          window.location.href = HUMANAPP + '/feed';
        }).catch((error) => {
          console.log(error);
          this.setState(byPropKey('error', "Request Not Added!!"))
          ToastStore.error("Request Not Added!!")
          // window.alert( "Request Not Added!!");
          // event.preventDefault();

        });
      event.preventDefault();
    } else {
      ToastStore.error("You are Offline!!!")
      event.preventDefault();
    }

  }

  handleLoc = (lat, lon) => {
    this.setState({ latitude: lat, longitude: lon });
  };

  handleImage = DataUrl => {
    this.setState({ image: DataUrl });
  };

  render() {

    const { title,
      resourceType,
      requestType,
      description,
      quantity,
      error } = this.state;

    const isInvalid = title == "" ||
      resourceType === "" ||
      requestType === "" ||
      description === "" ||
      quantity === null;


    return (
      <Grid>
        <Form horizontal
          onSubmit={this.onSubmit}
        >

          <h1>ADD REQUEST</h1>
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Request Title</Col>
            <Col xs={12} md={8}>
              <FormControl
                value={title}
                onChange={event =>
                  this.setState(byPropKey("title", event.target.value))
                }
                type="text"
                placeholder="Title"
              />
            </Col>
            </FormGroup>
            <FormGroup>
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
                <option value="food">food</option>
                <option value="clothing">clothing</option>
                <option value="other">other</option>
              </FormControl>
            </Col>
          </FormGroup>
          <AuthUserContext.Consumer>{
            authUser =>
              <input
                value={authUser.uid}
                onChange={event => this.setState(byPropKey('userId', event.target.value))}
                type="hidden"
                placeholder="Request Type"
              />
          }

          </AuthUserContext.Consumer>
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
                <option value="need">need</option>
                <option value="provision">provision</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Serving Quantity
          </Col>
            <Col xs={12} md={8}>
              <FormControl
                componentClass="select"
                placeholder="Serving Quantity"
                value={quantity}
                onChange={event =>
                  this.setState(byPropKey("quantity", event.target.value))
                }
              >
                <option value={0}>Select Servings</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>


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
          <br />

          <FormGroup>
            <Col xs={12} md={8}>
              <Mappy loc={this.handleLoc} />
            </Col>
          </FormGroup>
          <ModalCamera DataUrl={this.handleImage} />
          <br /><Grid>
            <Button bsStyle="success"
              bsSize="large" disabled={isInvalid} type="submit" block
              // onClick={()=>this.onSubmit}
              onSubmit={this.onSubmit}
            >
              Submit
        </Button></Grid>
          <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
          <h1>{this.state.error}</h1>
        </Form></Grid>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(AddRequest);
