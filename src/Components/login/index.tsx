// tslint:disable:ordered-imports
import * as React from 'react';
import { Button,Checkbox,Col,ControlLabel,Form,FormControl,FormGroup } from 'react-bootstrap';
import * as ReactDOM from 'react-dom';
import logo from '.././logo.svg';
import Register from '../register';
import NavUserFeed from '../navUserFeed';

export default class Login extends React.Component {
    public render() {
      return (
        // tslint:disable-next-line:jsx-boolean-value
        <Form horizontal>
        <img src={logo} className="App-logo" alt="logo" />
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={6}>
            <FormControl type="email" alt="email"  placeholder="Email" />
          </Col>
        </FormGroup>     
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={6}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>     
        <FormGroup>
          <Col smOffset={2} sm={6}>
            <Checkbox>Remember me</Checkbox>        
          </Col>
          
        </FormGroup>      
        <FormGroup>
         
          <Col smOffset={2} sm={6}>
            <Button type="submit" onClick={navUserFeed}>Sign in</Button>   
            <label onClick={register}>Register</label>
          </Col>
        
        </FormGroup>   
      </Form>
  
      );
    }
  }
  
  

  function register(){
    ReactDOM.render(
      <Register />,
      document.getElementById('root1') as HTMLElement
    );
  }

  
  function navUserFeed(){
    ReactDOM.render(
      <NavUserFeed />,
      document.getElementById('root1') as HTMLElement,
    );
  }



