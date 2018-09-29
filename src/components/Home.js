import React from "react";
import { Grid,Jumbotron } from "react-bootstrap";

import withAuthorization from "./withAuthorization";
import carousel from "./carousel.png";


const HomePage = () => (
  <div>
    <Grid>
      <Jumbotron>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
      </Jumbotron>
    </Grid>
  </div>
);

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(HomePage);
