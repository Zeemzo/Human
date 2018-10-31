import React from "react";
import AuthUserContext from "./AuthUserContext";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import { LinkContainer } from "react-router-bootstrap";


class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const lol = { color: "white" }

    return (
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    );
  }
}
// const lol={color:"white"}
const NavigationAuth = () => (
  <Navbar className ={localStorage.getItem("SideMenu") != null &&
    localStorage.getItem("SideMenu") == "Green" ? "SideMenuGreen" : "SideMenuBlack"} >
    <Nav>
      <LinkContainer to={routes.HOME}>
        <NavItem id={"n1"}>Home</NavItem>
      </LinkContainer>
    <LinkContainer to={routes.FEED}>
      <NavItem id={"n1"}>Feed</NavItem>
    </LinkContainer>
    <LinkContainer to={routes.ADDREQUEST}>
      <NavItem id={"n1"}>Add Request</NavItem>
    </LinkContainer>
    <LinkContainer to={routes.ACCOUNT}>
      <NavItem id={"n1"}>Account</NavItem>
    </LinkContainer>
    <LinkContainer to={'/contributions'}>
      <NavItem id={"n1"}>Contributions</NavItem>
    </LinkContainer>
    <AuthUserContext.Consumer>


      {authUser => (authUser.displayName == 'ADMIN' ?
        <LinkContainer to={'/reports'}>
          <NavItem id={"n1"}>Reports</NavItem>
        </LinkContainer> : null)}


    </AuthUserContext.Consumer>
    <AuthUserContext.Consumer>
      {authUser => (authUser.displayName == 'ADMIN' || authUser.displayName == 'CONTRIBUTOR' ?
        <LinkContainer to={'/activefulfillments'}>
          <NavItem id={"n1"}>Active Matches</NavItem>
        </LinkContainer> : null)}
    </AuthUserContext.Consumer>
    <LinkContainer to='/chat'>
      <NavItem id={"n1"}>Chat</NavItem>
    </LinkContainer>

    </Nav>
  <Nav pullRight>
    {/* <NavItem> */}
      <SignOutButton />
    {/* </NavItem> */}
  </Nav>
  </Navbar >


);

const NavigationNonAuth = () => (

  <Navbar className={localStorage.getItem("SideMenu") != null &&
    localStorage.getItem("SideMenu") == "Green" ? "SideMenuGreen" : "SideMenuBlack"}>
    <Nav>
      <LinkContainer to="/">
        <NavItem id={"n1"}>Human</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/signin">
        <NavItem id={"n1"}>Sign In</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default Navigation;
