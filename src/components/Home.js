import React from "react";
import { Grid,Jumbotron } from "react-bootstrap";
import withAuthorization from "./withAuthorization";
import News from './News';


const HomePage = () => (
  <div>
    <Grid>
      <Jumbotron>
        <h1>Home</h1>
        <p>Here are some pressing matters</p>
      </Jumbotron>
      <News/>
    </Grid>
  </div>
);

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(HomePage);
