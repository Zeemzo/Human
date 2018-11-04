import React, { Component } from "react";
import withAuthorization from "./withAuthorization";
import { firebase } from "../firebase/index";
import axios from "axios";
import AuthUserContext from './AuthUserContext';
import { HUMANBACKEND, HUMANAPP } from "../constants/routes";
import { ToastContainer, ToastStore } from 'react-toasts';
import { ClipLoader } from "react-spinners";


import {
  Row,
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
var Regex = require("regex");


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
  error: null,
  loading: false,
  success: null
};





class AddRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {

    var user = firebase.auth.currentUser;

    if (localStorage.getItem("archived") != null) {
      this.setState(JSON.parse(localStorage.getItem("archived")))
      ToastStore.success("Archived Request Loaded!!")
      if (user) {
        this.setState(byPropKey('email', user.email))
        this.setState(byPropKey('userId', user.uid))

      }

    } else {
      this.setState({ ...INITIAL_STATE })
      if (user) {
        this.setState(byPropKey('email', user.email))
        this.setState(byPropKey('userId', user.uid))

      }
    }
  }
  onSubmit = (event) => {

    if (navigator.onLine) {
      this.setState({ loading: true })
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
          // this.setState(byPropKey('success', "Request Added!!"))
          // this.setState({...INITIAL_STATE})
          this.setState({ loading: false })

          ToastStore.success("Request Added!!")
          localStorage.removeItem("archived")
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
      ToastStore.error("You are Offline, request archived.")
      localStorage.setItem("archived", JSON.stringify(this.state))
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
      error, success } = this.state;

    const isInvalid = title == "" ||
      resourceType === "" ||
      requestType === "" ||
      description === "" ||
      quantity === null;

    const err = { color: "red" }
    const suc = { color: "green" }

    // const regex = new Regex("[A-Ba-b]");


    return (
      <Grid>

        <Form horizontal
          onSubmit={this.onSubmit}
        >

          <h2>ADD REQUEST</h2>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={3} md={3} lg={3}>
              Request Title *</Col>
            <Col xs={12} sm={8} md={8} lg={8}>
              <FormControl
                value={title}
                onChange={event => {
                  this.setState(byPropKey("title", event.target.value))
                  const regex = RegExp('^[A-Za-z0-9 ]+$')
                  console.log(event.target.value)
                  console.log(regex.test(event.target.value))

                  if (!regex.test(event.target.value)) {
                    this.setState(byPropKey("error", "The title cannot have symbols"));
                    // ToastStore.error("The title cannot have symbols or numbers")
                    // ToastStore.success("Match")

                  } else {
                    this.setState(byPropKey("error", null));
                  }
                }
                }
                type="text"
                placeholder="Title"
              />
            </Col>
          </FormGroup>
          {error && <p style={err}>{error}</p>}

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3} md={3} lg={3}>
              Resource Type *
          </Col>
            <Col xs={12} sm={8} md={8} lg={8}>
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
            <Col componentClass={ControlLabel} sm={3} md={3} lg={3}>
              Request Type *
          </Col>
            <Col xs={12} sm={8} md={8} lg={8}>
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
            <Col componentClass={ControlLabel} sm={3} md={3} lg={3}>
              Serving Quantity *
          </Col>
            <Col xs={12} sm={8} md={8} lg={8}>
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
            <Col componentClass={ControlLabel} sm={3} md={3} lg={3}>
              Description *
          </Col>
            <Col xs={12} sm={8} md={8} lg={8}>
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
            <Col xs={12} sm={12} md={12} lg={12}>
              <Mappy loc={this.handleLoc} />
            </Col>
          </FormGroup>
          <Col xs={12} sm={12} md={12} lgOffset={4} lg={12}>
            <ModalCamera DataUrl={this.handleImage} />
          </Col>

          <br /><Grid><Row><Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
            // style={override}
            sizeUnit={"px"}
            size={30}
            color={"green"}
            loading={this.state.loading}
          // style="text-align:center"
          /></p></Col></Row></Grid>
          {/* {success && <p style={suc}>{success}</p>} */}

          <p>

            <Button bsStyle="success"
              bsSize="large" disabled={isInvalid} type="submit"
              // onClick={()=>this.onSubmit}
              onSubmit={this.onSubmit}
            >
              Submit
        </Button></p>
          <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
        </Form></Grid>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(AddRequest);
