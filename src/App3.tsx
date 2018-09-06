import * as React from 'react';
import { Button,Checkbox,Col,ControlLabel,Form,FormControl,FormGroup } from 'react-bootstrap';

import './App.css';

// import logo from './logo.svg';

class App2 extends React.Component {
  public render() {
    return (
      // tslint:disable-next-line:jsx-boolean-value
      <Form horizontal>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl type="email" placeholder="Email" />
        </Col>
      </FormGroup>
    
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl type="password" placeholder="Password" />
        </Col>
      </FormGroup>
    
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Checkbox>Remember me</Checkbox>
        </Col>
      </FormGroup>
    
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit" >Sign in</Button>
        </Col>
      </FormGroup>
    </Form>

    );
  }
}




export default App2;
