
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Collapse, Button, Navbar, NavItem, Image, Grid } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import withAuthentication from './withAuthentication';
import Feed from './Feed';
import Admin from './Admin';
import Cam from './camera';
import Chat from './Chat';
import ChatScreen from './Chatty';
// import SlideMenu from 'react-slide-menu'
import * as routes from '../constants/routes';
import AddRequest from './AddRequest';
import Contributions from './Contributions';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      isVisible: true,
      isPaneOpenLeft: false,

    };

  }


  //  

  componentDidMount() {
    Modal.setAppElement(this.el);
    window.addEventListener("resize",
      this.resize.bind(this)
    );
    this.resize();
  }

  resize() {
    this.setState({ open: window.innerWidth >= 760 });
    this.setState({ isVisible: window.innerWidth <= 760 });

  }

  // mousedown() {
  //   this.setState({open:false});
  // }

  render() {
    return (
      <Router>

        <div ref={ref => this.el = ref}>
          {this.state.isVisible ?
            <Navbar fluid  >
              {/* <LinkContainer to={'/home'}>
                <NavItem>Home</NavItem>
              </LinkContainer> */}
              <button onClick={() => this.setState({ isPaneOpenLeft: true })}>
                <Image width="32" height="24" src={'./menu.png'} rounded />
              </button>

              {/* {this.state.isVisible ?
                <Navbar.Header>
                  <div><Button onClick={() =>
                    this.setState({ open: !this.state.open })}>
                    <Image width="32" height="24" src={'./menu.png'} rounded />
                  </Button></div>
                </Navbar.Header>
                : null}
            </Navbar> :
            null} */}
              {/* {this.state.isVisible ?
                <Button onClick={() =>
                    this.setState({ open: !this.state.open })}>
                  </Button>
                : null} */}
            </Navbar> :
            null}


          {/* <h1  > */}
          {/* <Image width="90" height="85" src={'./human.png'} /></h1> */}
          {/* <br />
          <br /> */}

          <Collapse in={this.state.hideNav ? false : this.state.open}>
            <div>
              <Navigation /></div></Collapse>
          <SlidingPane
            isOpen={this.state.isPaneOpenLeft}
            title={<Image height={20} src={'./logo.png'} />}
            from='left'
            width='230px'
            onRequestClose={() => this.setState({ isPaneOpenLeft: false })}>
            <div>
            <Navigation /></div>
          </SlidingPane>

        <hr />

        <Route exact path={routes.LANDING} component={LandingPage} />
        <Route exact path={routes.SIGN_UP} component={SignUpPage} />
        <Route exact path={routes.SIGN_IN} component={SignInPage} />
        <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.ACCOUNT} component={AccountPage} />
        <Route exact path={routes.FEED} component={Feed} />
        <Route exact path={routes.ADDREQUEST} component={AddRequest} />
        <Route exact path={'/admin'} component={Admin} />
        <Route exact path={'/contributions'} component={Contributions} />

        {/* <Route exact path={'/camera'} component={Cam} /> */}



        {/* <Route exact path={routes.LOCATION} component={Mappy} /> */}
        {/* <Route exact path={routes.CAMERA} component={Cam} /> */}
        <Route exact path={'/chat'} component={ChatScreen} />
        {/* <Route exact path={'/chatty'} component={ChatScreen} /> */}





        </div>
      </Router >
    )
  }
}




export default withAuthentication(App);
