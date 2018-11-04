import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Collapse, Navbar, Image,Row,Button,Grid,Col } from "react-bootstrap";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { Link } from "react-router-dom";
import {ToastContainer, ToastStore} from 'react-toasts';

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
import Settings from './Settings';

import AllChat from './AllChat';
import * as routes from '../constants/routes';
import AddRequest from './AddRequest';
import Contributions from './Contributions';
import MapContainer from './Multimap';
import ActiveFulfillments from './ActiveFulfillments'
import Confirm from './Confirm'
import FloatingMenu from "./FloatingMenu"
import Leaders from './Leaders';


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      isVisible: true,
      isPaneOpenLeft: false,

    };
    this.mousedown=this.mousedown.bind(this)
  }
  componentDidMount() {
    if (!navigator.onLine) {
      ToastStore.error("You are Offline!!!")

    }
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

  mousedown() {
    this.setState({ isPaneOpenLeft: false });
    this.setState({ isPaneOpenRight: false });

  }

  render() {
    return (
      <Router>
            

        <div ref={ref => this.el = ref}>
          {this.state.isVisible ?
            <Navbar className={localStorage.getItem("SideMenu")!=null&&localStorage.getItem("SideMenu")=="Green"?"SideMenuGreen":"SideMenuBlack"} >
            <Col xs={2} xsPull={1}>
                <Image id={"imagepress"} alt={"menu"} onClick={() => this.setState({ isPaneOpenLeft: true })} width="50"  src={'./white-menu-icon-4.jpg'} rounded />
            </Col><Grid><Row>
            <Col xs={8}><p>
            {/* {window.location.pathname} */}
                <Image  width="180"  src={'./sidebar.png'} rounded alt={"human"}/>
                </p>
            </Col>  <Col xs={2}>
            <Link to={"/settings"}><Image id={"imagepress"} width="50"  src={'./settings.png'} alt={"settings"} rounded /></Link>
            </Col>
            </Row></Grid>
          
           
            </Navbar> :
            null}

          <Collapse in={this.state.hideNav ? false : this.state.open}>
            <div>
              <Navigation   className={localStorage.getItem("SideMenu")==null?"SideMenuBlack":"SideMenuGreen"} /></div></Collapse>
          <SlidingPane className={localStorage.getItem("SideMenu")!=null&&localStorage.getItem("SideMenu")=="Green"?"SideMenuGreen":"SideMenuBlack"}
         zIndex={1}
            isOpen={this.state.isPaneOpenLeft}
            title={<Image height={40} src={'./sidebar.png'} alt={"human"}/>}
            from='left'
            width='300px'
            onRequestClose={() => this.setState({ isPaneOpenLeft: false })}>
            <div onMouseDown ={() => this.setState({ isPaneOpenLeft: false })}>
              <Navigation className={localStorage.getItem("SideMenu")!=null&&
              localStorage.getItem("SideMenu")=="Green"?"SideMenuGreen":"SideMenuBlack"} />
            </div>
          </SlidingPane>
     

          <hr />
          <Link  to={routes.ADDREQUEST}>< FloatingMenu/>
                    </Link>
          
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} />
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={routes.HOME} component={HomePage} />
          <Route exact path={routes.ACCOUNT} component={AccountPage} />
          <Route exact path={routes.FEED} component={Feed} />
          <Route exact path={routes.ADDREQUEST} component={AddRequest} />
          <Route exact path={'/reports'} component={Admin} />
          <Route exact path={'/contributions'} component={Contributions} />
          <Route exact path={'/map'} component={MapContainer} />
          <Route exact path={'/activefulfillments'} component={ActiveFulfillments} />
          <Route exact path={'/confirm'} component={Confirm} />
          <Route exact path={'/chat'} component={AllChat} />
          <Route exact path={'/settings'} component={Settings} />
          <Route exact path={'/leaderboard'} component={Leaders} />

          {/* <Route exact path={'/chatty'} component={ChatScreen} /> */}


        <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore}/>



        </div>
      </Router >
    )
  }
}




export default withAuthentication(App);
