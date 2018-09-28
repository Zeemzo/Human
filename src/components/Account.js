import React from "react";
import AuthUserContext from "./AuthUserContext";
import { PasswordForgetForm } from "./PasswordForget";
import PasswordChangeForm from "./PasswordChange";
import withAuthorization from "./withAuthorization";
import {
  Grid,
  Row,
  Col,
  Image,
  ControlLabel,
  FormGroup,
  Button,
  FormControl,
  Radio,
  Checkbox,
  HelpBlock
} from "react-bootstrap";
import tumb from "./thumbnail.png";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Grid>
          <Row>
            <Col xs={10} md={8}>
              <h1>Account: {authUser.email}</h1>
            </Col>
            <Col xs={6} md={4}>
              <Image src={tumb} circle />
              <FieldGroup id="formControlsFile" type="file" />
            </Col>
          </Row>
          <Row>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </Row>
        </Grid>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(AccountPage);
