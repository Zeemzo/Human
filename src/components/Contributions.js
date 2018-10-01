import * as React from "react";
import AuthUserContext from './AuthUserContext';

import { Tab, Row, Col, NavItem, Nav } from "react-bootstrap";
// import tumb from './thumbnail.png';
// import axios from 'axios';
// import { ClipLoader } from 'react-spinners';
import withAuthorization from "./withAuthorization";
// import { HUMANBACKEND } from '../constants/routes';
import Provision from "../components/Provision";
import Need from "../components/Need";
import Contributor from "../components/Contributor";

import { LinkContainer } from "react-router-bootstrap";
import Fulfilled from "./fulfilled";
import Unfulfilled from "./unfulfilled";

// // import store from '../store/index'
// const feed = () => {

// }

class Contributions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Container id="uncontrolled-tab-example" defaultActiveKey={2}>
        <Row className="clearfix">
          <Col>


            <AuthUserContext.Consumer>
              {authUser =>
                <div><h2>
                  Hello {authUser.email}</h2>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey={1}>Fulfilled</NavItem>
                    <NavItem eventKey={2}>Unfulfilled</NavItem>
                  </Nav></div>
              }
            </AuthUserContext.Consumer>


          </Col>
          <br />
          <Col sm={8}>
            <Tab.Content animation>
              <Tab.Pane eventKey={1}>
                <Fulfilled type={'fulfilled'}/>
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                <Fulfilled type={'unfulfilled'} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      // <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      //   <Tab eventKey={1} title="Provision">
      //     <Provision type={"provision"} />
      //   </Tab>
      //   <Tab eventKey={2} title="Need">
      //     <Need type={"need"} />
      //   </Tab>
      //   <Tab eventKey={3} title="Matched Request" />
      // </Tabs>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Contributions);
// export default Feed;
