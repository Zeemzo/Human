import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Home from './Components/home';
// tslint:disable:ordered-imports
import {Nav, Navbar,NavItem } from 'react-bootstrap';
import Login from './Components/login';
import Listings from './Components/Listings';
import AboutUs from './Components/about';



export default class App extends React.Component {
    public render() {
      return (
            // tslint:disable:jsx-boolean-value
        <Navbar>
      <Navbar.Header>
       <Navbar.Brand  onClick={home}>
          Human
      </Navbar.Brand>
     </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} onClick={listing}>
     Listing
    </NavItem>
    <NavItem eventKey={2} onClick={aboutUs}>
      About Us
    </NavItem>
  </Nav>

  <Nav pullRight>
      <NavItem eventKey={1} onClick={login}>
        Login
      </NavItem>
      </Nav>
</Navbar>
      );
    }
  }


  function home(){
    ReactDOM.render(
      <Home />,
      document.getElementById('root1') as HTMLElement
    );
  }
  
    function login(){
      ReactDOM.render(
        <Login />,
        document.getElementById('root1') as HTMLElement
      );
  }

  
  function listing(){
    ReactDOM.render(
      <Listings />,
      document.getElementById('root1') as HTMLElement
    );
  }

   
  function aboutUs(){
    ReactDOM.render(
      <AboutUs />,
      document.getElementById('root1') as HTMLElement
    );
  }
  