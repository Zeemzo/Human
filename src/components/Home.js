import React from "react";
import { Grid,Jumbotron } from "react-bootstrap";

import withAuthorization from "./withAuthorization";
// import carousel from "./carousel.png";
// import Multii from './Multimap'
// import kaka from "./Multimap";
// import KAKA from "./Multimap";
// import Map from './MapSUB'
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
