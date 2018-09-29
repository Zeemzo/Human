import React from "react";
import { Link } from "react-router-dom";
import AuthUserContext from "./AuthUserContext";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import SlideMenu from 'react-slide-menu'

import { LinkContainer } from "react-router-bootstrap";
const Navigation = () => (

  <AuthUserContext.Consumer>
 

    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
 
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <Navbar >
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Human</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to={routes.HOME}>
        <NavItem>Home</NavItem>
      </LinkContainer>

      <LinkContainer to={routes.ACCOUNT}>
        <NavItem>Account</NavItem>
      </LinkContainer>
      <LinkContainer to={routes.FEED}>
        <NavItem>Feed</NavItem>
      </LinkContainer>
      <LinkContainer to={routes.ADDREQUEST}>
        <NavItem>Add Request</NavItem>
      </LinkContainer>
      {/* <LinkContainer to={routes.LOCATION}>
        <NavItem>Locate</NavItem>
      </LinkContainer>
      <LinkContainer to={routes.CAMERA}>
        <NavItem>Camera</NavItem>
      </LinkContainer> */}
      <LinkContainer to='/chat'>
        <NavItem>Chat</NavItem>
      </LinkContainer>
     
    </Nav>
    <Nav pullRight>
      <NavItem>
        <SignOutButton />
      </NavItem>
    </Nav>
  </Navbar>


);

const NavigationNonAuth = () => (
  //  <Navbar default collapseOnSelect>
  //   <Navbar.Collapse>
  //     <Nav>
  //     <NavItem componentClass={Link} to={routes.LANDING}>Landing</NavItem>
  //     <NavItem  componentClass={Link}>Sign In</NavItem>

  //    </Nav>
  //   </Navbar.Collapse>
  //   </Navbar>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Human</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="">
        <NavItem>Landing</NavItem>
      </LinkContainer>
      {/* <Link to={routes.SIGN_IN}>Sign In</Link> */}
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/SignIn">
        <NavItem>Sigin</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default Navigation;
