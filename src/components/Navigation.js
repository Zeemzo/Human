import React from "react";
import AuthUserContext from "./AuthUserContext";
import { Nav, Navbar, NavItem, Image } from "react-bootstrap";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import { LinkContainer } from "react-router-bootstrap";


class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // open:null,
    }

  }


  render() {
    const lol = { color: "white" }

    return (
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth isVisible={this.state.isVisible} /> : <NavigationNonAuth isVisible={this.state.isVisible} />)}
      </AuthUserContext.Consumer>
    );
  }
}
// const lol={color:"white"}
class NavigationAuth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: true,
    }
  }
  componentDidMount() {
    window.addEventListener("resize",
      this.resize.bind(this)
    );
    this.resize();

  }

  resize() {
    // this.setState({ open: window.innerWidth >= 760 });
    this.setState({ isVisible: window.innerWidth <= 760 });
  }
  render() {
    return (
      <Navbar className={localStorage.getItem("SideMenu") != null &&
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
          <LinkContainer to={'/leaderboard'}>
            <NavItem id={"n1"}>Stats</NavItem>
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
          <LinkContainer to='/messages'>
            <NavItem id={"n1"}>Message</NavItem>
          </LinkContainer>

        </Nav>{!this.state.isVisible ? <Nav pullRight>
          <LinkContainer to="/settings">
            <NavItem id={"n1"}><Image id={"imagepress"} width="20" src={'./settings.png'} alt={"settings"} rounded /></NavItem>
          </LinkContainer>
        </Nav> : null}
        <Nav pullRight>
          {/* <NavItem> */}
          <SignOutButton />
          {/* </NavItem> */}
        </Nav>

      </Navbar >
    );
  }
}

class NavigationNonAuth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: true,
    }
  }
  componentDidMount() {
    window.addEventListener("resize",
      this.resize.bind(this)
    );
    this.resize();

  }

  resize() {
    // this.setState({ open: window.innerWidth >= 760 });
    this.setState({ isVisible: window.innerWidth <= 760 });
  }
  render() {
    return (

      <Navbar className={localStorage.getItem("SideMenu") != null &&
        localStorage.getItem("SideMenu") == "Green" ? "SideMenuGreen" : "SideMenuBlack"}>
        <Nav>
          <LinkContainer to="/">
            <NavItem id={"n1"}>Human</NavItem>
          </LinkContainer>
        </Nav>
        {!this.state.isVisible ? <Nav pullRight>
          <LinkContainer to="/settings">
            <NavItem id={"n1"}><Image id={"imagepress"} width="20" src={'./settings.png'} alt={"settings"} rounded /></NavItem>
          </LinkContainer>
        </Nav> : null}
        <Nav pullRight>
          <LinkContainer to="/signin">
            <NavItem id={"n1"}>Sign In</NavItem>
          </LinkContainer>
        </Nav>


      </Navbar>
    );
  }
}



export default Navigation;
