import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel
} from "react-bootstrap";

import { auth } from "../firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.setState(byPropKey("error", "Password has successfully been changed!"));

      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            New Password
          </Col>{" "}
          <Col xs={6} md={4}>
            <FormControl
              value={passwordOne}
              onChange={event =>
                this.setState(byPropKey("passwordOne", event.target.value))
              }
              type="password"
              placeholder="New Password"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Confirm Password
          </Col>{" "}
          <Col xs={6} md={4}>
            <FormControl
              value={passwordTwo}
              onChange={event =>
                this.setState(byPropKey("passwordTwo", event.target.value))
              }
              type="password"
              placeholder="Confirm New Password"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button disabled={isInvalid} type="submit"  bsStyle="success"
                    bsSize="medium">
              Reset My Password
            </Button>
          </Col>
        </FormGroup>
        {error && <p>{error.message}</p>}
      </Form>
      
    );
  }
}

export default PasswordChangeForm;
