import React from "react";
import { Link } from "react-router-dom";
import AuthUserContext from "./AuthUserContext";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import { LinkContainer } from "react-router-bootstrap";
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Human</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/home">
        <NavItem>Home</NavItem>
      </LinkContainer>

      <LinkContainer to="/Account">
        <NavItem>Account</NavItem>
      </LinkContainer>
      <LinkContainer to="/Feed">
        <NavItem>Feed</NavItem>
      </LinkContainer>
      <LinkContainer to="/AddRequest">
        <NavItem>Add Request</NavItem>
      </LinkContainer>
      <LinkContainer to="/locate">
        <NavItem>Locate</NavItem>
      </LinkContainer>
      <LinkContainer to="/camera">
        <NavItem>Camera</NavItem>
      </LinkContainer>
      <LinkContainer to="/chatty">
        <NavItem>Chatty</NavItem>
      </LinkContainer>
     
    </Nav>
    <Nav pullRight>
      <NavItem>
        <SignOutButton />
      </NavItem>
    </Nav>
  </Navbar>

  // <Navbar default collapseOnSelect>
  //   <Navbar.Collapse>
  //     <Nav>
  //       <NavItem>
  //         {" "}
  //         <Link to={routes.HOME}>Home</Link>
  //       </NavItem>
  //       <NavItem>
  //         {" "}
  //         <Link to={routes.ACCOUNT}>Account</Link>
  //       </NavItem>
  //       <NavItem>
  //         {" "}
  //         <Link to={routes.FEED}>Feed</Link>
  //       </NavItem>
  //       <NavItem>
  //         {" "}
  //         <Link to={routes.ADDREQUEST}>Add Request</Link>
  //       </NavItem>
  //       <NavItem>
  //         {" "}
  //         <Link to={routes.LOCATION}>Locate</Link>
  //       </NavItem>
  //       <NavItem>
  //         {" "}
  //         <Link to={routes.CAMERA}>Camera</Link>
  //       </NavItem>
  //     </Nav>
  //     <Nav pullRight>
  //       <NavItem>
  //         <SignOutButton />
  //       </NavItem>
  //     </Nav>
  //   </Navbar.Collapse>

  //      <ul>
  //     <li><Link to={routes.LANDING}>Landing</Link></li>
  //     <li><Link to={routes.HOME}>Home</Link></li>
  //     <li><Link to={routes.ACCOUNT}>Account</Link></li>
  //     <li><Link to={routes.FEED}>Feed</Link></li>
  //     <li><Link to={routes.ADDREQUEST}>Add Request</Link></li>
  //     <li><Link to={routes.LOCATION}>Locate</Link></li>
  //     <li><Link to={routes.CAMERA}>Camera</Link></li>
  //     <li><SignOutButton /></li>
  //  </ul>
  //   </Navbar>
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
