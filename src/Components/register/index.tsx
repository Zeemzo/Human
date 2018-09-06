import * as React from 'react';
import { Button,Col,ControlLabel,Form,FormControl,FormGroup } from 'react-bootstrap';

export default class Login extends React.Component {
    public render() {
      return (
        // tslint:disable-next-line:jsx-boolean-value
        <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            First Name
          </Col>
          <Col sm={6}>
            <FormControl type="email"  />
          </Col>
        </FormGroup>     
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Last Name
          </Col>
          <Col sm={6}>
            <FormControl type="text"  />
          </Col>
        </FormGroup>    
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Email
          </Col>
          <Col sm={6}>
            <FormControl type="email"  />
          </Col>
        </FormGroup>  
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Password
          </Col>
          <Col sm={6}>
            <FormControl type="password" />
          </Col>
        </FormGroup>      
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Phone Number
          </Col>
          <Col sm={6}>
            <FormControl type="text"  />
          </Col>
        </FormGroup>
      <FormGroup controlId="formControlsSelect">
      <Col componentClass={ControlLabel} sm={2}>Select User Type </Col>
      <Col sm={6}>
      <FormControl componentClass="select" placeholder="Select User Type">
        <option value="u1">Normal User</option>
        <option value="u2">Contributer</option>
      </FormControl>
      </Col>
    </FormGroup>       
        <FormGroup>
          <Col smOffset={2} sm={6}>
            <Button type="submit" >Register</Button>   
          </Col>
        </FormGroup>   
      </Form>
      );
    }
  }
  



  