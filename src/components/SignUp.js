import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import * as routes from "../constants/routes";

import { auth as Auth } from '../firebase/firebase'
import axios from 'axios'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  Form
} from "react-bootstrap";

const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  role: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { role,
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;


    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        authUser.user.updateProfile({ displayName: role }).then(() => {
          console.log(authUser.user);
        })


        //send user name to get a chatkit token
        axios.post(routes.HUMANBACKEND + '/api/users', { email: Auth.currentUser.email }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
        })
          .then(response => {
            //////send user data to the backend to store in the db, includeing user roles.
            axios
              .post(routes.HUMANBACKEND + '/api/adduser', { username: username, role: role, userId: authUser.user.uid }, {
                headers: {
                  "Content-Type": "application/json",
                  'Access-Control-Allow-Origin': '*',
                }
              })
              .then((res) => {
                console.log(res.data);

                console.log(response)
                const userId = Auth.currentUser.uid
                const pushToken = localStorage.getItem('pushToken')

                ////to send the push token id to the backend
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



                this.setState(byPropKey('error', res))
              }).catch((error) => {
                console.log(error);

              });

          })

        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });


    event.preventDefault();
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error, role } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      role === "";

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup >
          <Col componentClass={ControlLabel} sm={2}>
            Full Name
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              value={username}
              onChange={event =>
                this.setState(byPropKey("username", event.target.value))
              }
              type="text"
              placeholder="Full Name"
            />
          </Col>
        </FormGroup>

        <FormGroup >
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
              type="text"
              placeholder="Email Address"
            />
          </Col>
        </FormGroup>

        <FormGroup >
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              value={passwordOne}
              onChange={event =>
                this.setState(byPropKey("passwordOne", event.target.value))
              }
              type="password"
              placeholder="Password"
            />
          </Col>
        </FormGroup>

        <FormGroup >
          <Col componentClass={ControlLabel} sm={2}>
            Confirm Password
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              value={passwordTwo}
              onChange={event =>
                this.setState(byPropKey("passwordTwo", event.target.value))
              }
              type="password"
              placeholder="Confirm Password"
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={2}>
            User Role
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              componentClass="select"
              placeholder="User Role"
              value={role}
              onChange={event =>
                this.setState(byPropKey("role", event.target.value))
              }
            >
              <option value="">Select User Role</option>
              <option value="USER">User</option>
              <option value="CONTRIBUTOR">Contributer</option>
              {/* <option value="ADMIN">Admin</option> */}

            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button disabled={isInvalid} type="submit">
              Sign Up
            </Button>
          </Col>
          {error && <p>{error.message}</p>}
        </FormGroup>
      </Form>

    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
