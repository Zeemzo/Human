import * as React from 'react';
import { BrowserRouter as Router, NavLink ,Route} from 'react-router-dom';
// import axios from 'axios';

import './App.css';

import AddRequest from './views/addRequest/index';
import Feed from './views/feed/index';
import Login from './views/login/index';
import Register from './views/register/index';
import * as ViewRequest from './views/viewRequest/index';

// const lol="lol";
class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
        <NavLink to="/login" >Login</NavLink>
        <NavLink to="/register" >Register</NavLink>
        <NavLink to="/feed" >Feed</NavLink>
        <NavLink to="/addrequest" >Add Request</NavLink>
        <NavLink to="/viewrequest" >View request</NavLink>



          <Route path="/login" exact={true} component={Login}/>
          <Route path="/register" exact={true} component={Register}/>
          <Route path="/feed" exact={true} component={Feed}/>
          <Route path="/addrequest" exact={true} component={AddRequest}/>
          <Route path="/viewrequest" exact={true} component={ViewRequest.Request}/>



        </div> 
      </Router>
    );
  }
}

export default App;
