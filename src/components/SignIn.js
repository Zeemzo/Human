import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// import store from '../store/index';
// import {connect} from 'react-redux'

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />

    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.token = { token: '' }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;


    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(email);
        axios.post(routes.HUMANBACKEND + '/api/token', { email: email },
          {
            // 'Access-Control-Allow-Origin':'*',
            "Content-Type": "application/json"
          })
          .then((res) => {
            console.log(res.data.token);
            localStorage.setItem('token', res.data.token);
          }).catch((err) => {
            console.log(err);
          });

        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

// const mapStateToProps = (token) => {
//   return {
//     token: token.token
//   }
// }
// const mapDispachToProps = (dispatch) => {
//   return {
//     onToken: () => dispatch({ type: 'SET_TOKEN' }),
//     onRequest: () => dispatch({ type: 'GET_TOKEN' }),

//   }
// }
//  connect(mapDispachToProps,mapStateToProps)

export default(withRouter(SignInPage));

export {
  SignInForm,
};