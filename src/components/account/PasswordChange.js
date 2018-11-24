import React, { Component } from "react";
import {
  Grid,
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,Row
} from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { ToastContainer, ToastStore } from 'react-toasts';

import { auth } from "../../firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  loading: false,

  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    this.setState({ loading: true })

    if(navigator.onLine){
      // this.setState({ loading: true })

      const { passwordOne } = this.state;
  
      auth
        .doPasswordUpdate(passwordOne)
        .then(() => {
  
          this.setState({ ...INITIAL_STATE });
          ToastStore.success("Password has successfully been changed!")
  
          this.setState(byPropKey("error", "Password has successfully been changed!"));
  
        })
        .catch(error => {
          this.setState(byPropKey("error", error));
        });
  
      event.preventDefault();
    } else {
      this.setState({ loading: false });
      ToastStore.error("Sorry, cannot change password when offline!")
      event.preventDefault();

    }
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    const err={color:"red"}

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup>
        <Col componentClass={ControlLabel} xs={12} sm={5} md={4} lg={4}>
            New Password *
          </Col>{" "}
          <Col xs={12} sm={12} md={8} lg={8}>
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
          <Col componentClass={ControlLabel} xs={12} sm={6} md={4} lg={4}>Confirm Password *
          </Col>{" "}
          <Col xs={12} sm={12} md={8} lg={8}>
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
        <Grid><Row><Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
            // style={override}
            sizeUnit={"px"}
            size={30}
            color={"green"}
            loading={this.state.loading}
          // style="text-align:center"
          /></p></Col></Row></Grid>
        <FormGroup>
        
          <Col xsOffset={3} xs={4} smOffset={4} sm={6}>
            <Button disabled={isInvalid} type="submit"  bsStyle="success"
                    bsSize="medium"
                    >
              Reset My Password
            </Button>
          </Col>
        </FormGroup>
        {error && <p  style={err}>{error.message}</p>}
        <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />

      </Form>
      
    );
  }
}

export default PasswordChangeForm;
