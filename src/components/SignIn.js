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
    <h1><Image width={300} src={'./MainLogo.png'} alt={"human"}/></h1>
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
  remember:false,
  error: null
};

if (localStorage.getItem("remember") == null) {
  localStorage.setItem("remember", false)

}


class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = null;
    this.token = { token: "" };
    this.remember = this.remember.bind(this)
  }

  remember(check) {
    if (check) {
      localStorage.setItem("remember", true)
    } else {
      localStorage.setItem("remember", false)

    }

  }
  componentDidCatch() {
    if (localStorage.getItem("remember") != null) {
      if (localStorage.getItem("remember") == "true") {
        INITIAL_STATE.email = (localStorage.getItem("email")!=null?localStorage.getItem("email"):"")
        INITIAL_STATE.password = (localStorage.getItem("p")!=null?localStorage.getItem("p"):"")
        INITIAL_STATE.remember=true;
      }

    
    }
    this.setState({ ...INITIAL_STATE })
  }
  componentDidMount() {
    if (localStorage.getItem("remember") != null) {
      if (localStorage.getItem("remember") == "true") {
        INITIAL_STATE.email = (localStorage.getItem("email")!=null?localStorage.getItem("email"):"")
        INITIAL_STATE.password = (localStorage.getItem("p")!=null?localStorage.getItem("p"):"")
        INITIAL_STATE.remember=true;
      }

    
    }
    this.setState({ ...INITIAL_STATE })
  }
  componentWillMount() {
    if (localStorage.getItem("remember") != null) {
      if (localStorage.getItem("remember") == "true") {
        INITIAL_STATE.email = (localStorage.getItem("email")!=null?localStorage.getItem("email"):"")
        INITIAL_STATE.password = (localStorage.getItem("p")!=null?localStorage.getItem("p"):"")
        INITIAL_STATE.remember=true;
      }

    
    }
    this.setState({ ...INITIAL_STATE })
  }
  onSubmit = event => {
    this.setState({ loading: true })

    const { email, password } = this.state;

    const { history } = this.props;

    if (localStorage.getItem("remember") !== null) {
      if (localStorage.getItem("remember") === "true") {
        localStorage.setItem("email", email)
        localStorage.setItem("p", password)
      }
    }


    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {


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
            onChange={event => {
              this.setState(byPropKey("email", event.target.value))
          
            }
            }
            type="text"
            placeholder={email!=""?email:"Email Address"}
          >
            <Col componentClass={ControlLabel} sm={3} >
              Email *
          </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <FormControl type="email" placeholder={email!=""?email:"Email Address"} />
            </Col>
          </FormGroup>

          <FormGroup
            value={password}
            onChange={event => {
              this.setState(byPropKey("password", event.target.value))
            }
            }
            type="password"
            placeholder={password!=""?password:"Password"}
          >
            <Col componentClass={ControlLabel} sm={3}>
              Password *
          </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <FormControl type="password" placeholder={password!=""?"******":"Password"} />
            </Col>
          </FormGroup>

          <FormGroup >
            <Col smOffset={2} sm={10}>
              <Checkbox onClick={e => this.remember(e.target.checked)} defaultChecked={this.state.remember}>
                Remember me</Checkbox>
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
