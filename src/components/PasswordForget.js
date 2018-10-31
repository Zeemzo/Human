import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { ToastContainer, ToastStore } from 'react-toasts';

import {
  Row,
  Grid,
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel
} from "react-bootstrap";
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
  loading: false,
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    this.setState({ loading: true })

    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        ToastStore.success("Password reset email sent!")

      })
      .catch(error => {
        this.setState({loading:false})
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
    const err={color:"red"}

    return (

<Grid>
      <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Email *          </Col>{" "}
          <Col xs={12} sm={6} md={6} lg={6}>
            <FormControl
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
              type="text"
              placeholder="Email"
            />
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
        <p><Button bsStyle="success" disabled={isInvalid} onClick={this.onSubmit}>Reset Password</Button></p>
        {error && <p  style={err}>{error.message}</p>}
        <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />

      </Form></Grid>
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