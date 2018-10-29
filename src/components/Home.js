import React from "react";
import { Grid,Jumbotron } from "react-bootstrap";
import withAuthorization from "./withAuthorization";
import News from './News';


const HomePage = () => (
  <div>
    <Grid>
      <Jumbotron>
        {/* <h1>Home</h1> */}
        <h4>Here are some pressing matters</h4>
      </Jumbotron>
      <News/>
    </Grid>
  </div>
);

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(HomePage);
