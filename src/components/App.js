
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';


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

import * as routes from '../constants/routes';
import AddRequest from './AddRequest';



const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
      <Route exact path={routes.FEED} component={Feed} />
      <Route exact path={routes.ADDREQUEST} component={AddRequest} />
      <Route exact path={routes.LOCATION} component={Mappy} />
      <Route exact path={routes.CAMERA} component={Cam} />
     
    </div>
  </Router>

export default withAuthentication(App);
