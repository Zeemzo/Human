import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
// import store from '../store/index';
// import {connect} from 'react-redux'
import { ClipLoader } from "react-spinners";

import {
  Grid,
  Button,
  FormGroup,
  FormControl,
  Form,
  Col,
  ControlLabel,
  Checkbox, Image, Row
} from "react-bootstrap";
import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";

import { auth } from "../firebase";
import { auth as Auth } from "../firebase/firebase";

import * as routes from "../constants/routes";

const SignInPage = ({ history }) => (
  <div>
    <h1><Image width={300} src={'./human2.png'} /></h1>
    <SignInForm history={history} />
    <PasswordForgetLink />

    <SignUpLink />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,

  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.token = { token: "" };
  }

  onSubmit = event => {
    this.setState({ loading: true })

    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(email);
        localStorage.setItem('email', email);

        axios.post(routes.HUMANBACKEND + '/api/token', { email: email },
          {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
          })
          .then((res) => {
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token);
          })
          .catch(err => {
            console.log(err);
          });

        const token = localStorage.getItem('token')
        const userId = Auth.currentUser.uid
        const pushToken = localStorage.getItem('pushToken')
        axios
          .post(routes.HUMANBACKEND + '/api/push/token', { pushToken: pushToken, userId: userId }, {
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
            }
          })
          .then((res) => {
            console.log(res.data);
            // this.setState(byPropKey('error', res))
          }).catch((error) => {
            console.log(error);
            // this.setState(byPropKey('error', error.message))

          });

        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ loading: false })

        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    const err = { color: "red" }
    return (
      <Grid>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup
            value={email}
            onChange={event =>
              this.setState(byPropKey("email", event.target.value))
            }
            type="text"
            placeholder="Email Address"
          >
            <Col componentClass={ControlLabel} sm={3} >
              Email *
          </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup
            value={password}
            onChange={event =>
              this.setState(byPropKey("password", event.target.value))
            }
            type="password"
            placeholder="Password"
          >
            <Col componentClass={ControlLabel} sm={3}>
              Password *
          </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>
          <Grid><Row><Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
            // style={override}
            sizeUnit={"px"}
            size={30}
            color={"green"}
            loading={this.state.loading}
          // style="text-align:center"
          /></p></Col></Row></Grid>
          {error && <p style={err}>{error.message}</p>}

          <FormGroup>
            <p >
              <Button bsStyle="success" disabled={isInvalid} type="submit">
                Sign In
            </Button>
            </p>
          </FormGroup>
        </Form>

      </Grid>
    );
  }
}

export default (withRouter(SignInPage));

export { SignInForm };
