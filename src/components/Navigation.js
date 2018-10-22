import React from "react";
// import { Link } from "react-router-dom";
import AuthUserContext from "./AuthUserContext";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
// import SlideMenu from 'react-slide-menu'

import { LinkContainer } from "react-router-bootstrap";


class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    );
  }
}
// const Navigation = () => (

//   <AuthUserContext.Consumer>


//     {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}

//   </AuthUserContext.Consumer>
// );

const NavigationAuth = () => (
  <Navbar  >
    {/* <Navbar.Header>
      <Navbar.Brand>
        <a href="/"><Image height={20} src={'./logo.png'} />
        </a>
      </Navbar.Brand>
    </Navbar.Header> */}
    <Nav>
      {/* <LinkContainer to={'/'}>
        <NavItem><Image  src={'./human.png'} /></NavItem>
      </LinkContainer> */}
      <LinkContainer to={routes.HOME}>
        <NavItem>Home</NavItem>
      </LinkContainer>
      <LinkContainer to={routes.FEED}>
        <NavItem>Feed</NavItem>
      </LinkContainer>
      <LinkContainer to={routes.ADDREQUEST}>
        <NavItem>Add Request</NavItem>
      </LinkContainer>
      <LinkContainer to={routes.ACCOUNT}>
        <NavItem>Account</NavItem>
      </LinkContainer>
      <LinkContainer to={'/contributions'}>
        <NavItem>My Contributions</NavItem>
      </LinkContainer>
      <AuthUserContext.Consumer>


        {authUser => (authUser.displayName == 'ADMIN' ?
          <LinkContainer to={'/reports'}>
            <NavItem>Reports</NavItem>
          </LinkContainer> : null)}


      </AuthUserContext.Consumer>
      <AuthUserContext.Consumer>
        {authUser => (authUser.displayName == 'ADMIN' || authUser.displayName == 'CONTRIBUTOR' ?
          <LinkContainer to={'/activefulfillments'}>
            <NavItem>Active Fulfillments</NavItem>
          </LinkContainer> : null)}
      </AuthUserContext.Consumer>
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

  <Navbar >
    <Nav>
      <LinkContainer to="/">
        <NavItem>Human</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/signin">
        <NavItem>Signin</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default Navigation;
