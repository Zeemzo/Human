
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {  Collapse, Button ,Grid,Jumbotron,Image} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import withAuthentication from './withAuthentication';
import Feed from './Feed';
import Mappy from './map';
import Cam from './camera';
import Chat from './Chat';
import ChatScreen from './Chatty';
// import SlideMenu from 'react-slide-menu'
import * as routes from '../constants/routes';
import AddRequest from './AddRequest';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    window.addEventListener("resize", ()=>{
      this.resize.bind(this)
      // window.addEventListener("click", this.setState({ open: !this.state.open }));

    });
    this.resize();
    // this.resize();
}

resize() {
  this.setState({open:window.innerWidth>=760});
}

  render() {
    return (
      <Router>
        
        <div>
        <Button pullLeft hidden={this.state.open} onClick={() => this.setState({ open: !this.state.open })}>
        <Image width="32" height="24" src={'./menu.png'} rounded />
        </Button>
        
      <h1 center >
       <Image width="90" height="85" src={'./human.png'}  /></h1>
        <Collapse in={this.state.hideNav?false:this.state.open}>
        <div>
          <Navigation /></div></Collapse>

          <hr />

          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} />
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={routes.HOME} component={HomePage} />
          <Route exact path={routes.ACCOUNT} component={AccountPage} />
          <Route exact path={routes.FEED} component={Feed} />
          <Route exact path={routes.ADDREQUEST} component={AddRequest} />

          {/* <Route exact path={routes.LOCATION} component={Mappy} /> */}
          {/* <Route exact path={routes.CAMERA} component={Cam} /> */}
          <Route exact path={'/chat'} component={ChatScreen} />
          {/* <Route exact path={'/chatty'} component={ChatScreen} /> */}





        </div>
      </Router>
    )
  }
}




export default withAuthentication(App);
