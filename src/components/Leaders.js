import React from 'react';
// import Reports from './Reports'
import {
Grid} from "react-bootstrap";
import AuthUserContext from './AuthUserContext';
import withAuthorization from "./withAuthorization";
import './App.css';
import App1 from './Reports3'
class Leaders extends React.Component {
  render() {
    return (
      // <div className="App">
      <Grid>
        <AuthUserContext.Consumer>
          {authUser =>
            <div>
              <h1>Leaderboard</h1>
              {/* <p>Restricted area! Only users with the admin rule are authorized.</p> */}
            </div>
          }

        </AuthUserContext.Consumer>
        <App1/>
        
        {/* <Reports /> */}
        </Grid>
      // </div>
    )
  }
}

const authCondition = (authUser) => !!authUser ;

export default withAuthorization(authCondition)(Leaders);