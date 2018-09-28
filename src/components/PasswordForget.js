import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
//       <Form horizontal onSubmit={this.onSubmit}>
//   <FormGroup controlId="formHorizontalEmail">
//     <Col componentClass={ControlLabel} sm={2}>
//       Email
//     </Col>
//     <Col sm={10}>
//       <FormControl type="email" placeholder="Email" />
//     </Col>
//   </FormGroup>

//   <FormGroup controlId="formHorizontalPassword">
//     <Col componentClass={ControlLabel} sm={2}>
//       Password
//     </Col>
//     <Col sm={10}>
//       <FormControl type="password" placeholder="Password" />
//     </Col>
//   </FormGroup>

//   <FormGroup>
//     <Col smOffset={2} sm={10}>
//       <Checkbox>Remember me</Checkbox>
//     </Col>
//   </FormGroup>

//   <FormGroup>
//     <Col smOffset={2} sm={10}>
//       <Button type="submit">Sign in</Button>
//     </Col>
//   </FormGroup>
// </Form>

      <form onSubmit={this.onSubmit}>
        

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};