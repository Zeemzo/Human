import React from 'react';
// import Reports from './Reports'
import {
Grid} from "react-bootstrap";
import AuthUserContext from './AuthUserContext';
import withAuthorization from "./withAuthorization";
import './App.css';
import App from './Reports2'
class AdminPage extends React.Component {
  render() {
    return (
      // <div className="App">
      <Grid>
        <AuthUserContext.Consumer>
          {authUser =>
            <div>
              <h1>Reports</h1>
              {/* <p>Restricted area! Only users with the admin rule are authorized.</p> */}
            </div>
          }

        </AuthUserContext.Consumer>
        <App/>
        
        {/* <Reports /> */}
        </Grid>
      // </div>
    )
  }
}

const authCondition = (authUser) => !!authUser && authUser.displayName === 'ADMIN';

export default withAuthorization(authCondition)(AdminPage);