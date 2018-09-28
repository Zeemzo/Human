import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import * as routes from "../constants/routes";

import {auth as Auth} from '../firebase/firebase'
// import * as routes from '../constants/routes';
import axios from 'axios'
// import * as routes from '../constants/routes';
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
    const {
        username,
        email,
        passwordOne,
      } = this.state;

      const {
        history,
      } = this.props;
  
  
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
         axios.post(routes.HUMANBACKEND+'/api/users',{email: Auth.currentUser.email } ,{

            headers: {
              'Access-Control-Allow-Origin':'*',

                'Content-Type': 'application/json',
            }
        })
            .then(response => {
              console.log(response)
                // this.setState({
                //     currentUsername: auth.currentUser.email
                // })
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
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Form horizontal>
        <FormGroup onSubmit={this.onSubmit}>
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

        <FormGroup onSubmit={this.onSubmit}>
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

        <FormGroup  onSubmit={this.onSubmit}>
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

        <FormGroup onSubmit={this.onSubmit}>
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

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button disabled={isInvalid} type="submit">
              Sign Up
            </Button>
          </Col>
          {error && <p>{error.message}</p>}
        </FormGroup>
      </Form>

      // <FormGroup onSubmit={this.onSubmit}>
      //   <FormControl
      //     value={username}
      //     onChange={event => this.setState(byPropKey('username', event.target.value))}
      //     type="text"
      //     placeholder="Full Name"
      //   /><br/>
      //   <FormControl
      //     value={email}
      //     onChange={event => this.setState(byPropKey('email', event.target.value))}
      //     type="text"
      //     placeholder="Email Address"
      //   /><br/>
      //   <FormControl
      //     value={passwordOne}
      //     onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
      //     type="password"
      //     placeholder="Password"
      //   /><br/>
      //   <FormControl
      //     value={passwordTwo}
      //     onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
      //     type="password"
      //     placeholder="Confirm Password"
      //   /><br/>
      //   <Button disabled={isInvalid} type="submit">
      //     Sign Up
      //   </Button>

      //   { error && <p>{error.message}</p> }
      // </FormGroup>
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
