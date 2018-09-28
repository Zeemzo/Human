import React from "react";
import { Jumbotron, Button, Carousel, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../constants/routes";

const LandingPage = () => (
  <div>
    <Jumbotron>
      <h1>Being You</h1>
      <p>
        HUMAN connects neighbours with each other so surplus food and other
        items can be shared,
        <br /> not thrown away.
        <br />
        If you love food, hate waste, care about people or want to connect with
        your community,
        <br /> HUMAN is for you.
      </p>
      <p>
        <Link to={routes.SIGN_UP}>
          <Button bsStyle="success">Join Now</Button>
        </Link>
      </p>
    </Jumbotron>
  </div>
);

export default LandingPage;
