import * as React from "react";
import { Tab, Tabs, Row, Col, NavItem, Nav } from "react-bootstrap";
// import tumb from './thumbnail.png';
// import axios from 'axios';
// import { ClipLoader } from 'react-spinners';
import withAuthorization from "./withAuthorization";
// import { HUMANBACKEND } from '../constants/routes';
import Provision from "../components/Provision";
import Need from "../components/Need";
import { LinkContainer } from "react-router-bootstrap";

// // import store from '../store/index'
// const feed = () => {

// }

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Container id="uncontrolled-tab-example" defaultActiveKey={1}>
        <Row className="clearfix">
          <Col>
            <Nav bsStyle="pills">
              <NavItem eventKey={1}>Provision</NavItem>{" "}
              <NavItem eventKey={2}>Need</NavItem>{" "}
              <NavItem eventKey={3}>Match Request</NavItem>{" "}
            </Nav>
          </Col>
          <br />
          <Col sm={8}>
            <Tab.Content animation>
              <Tab.Pane eventKey={1}>
                <Provision type={"provision"} />
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                <Need type={"need"} />
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
export default withAuthorization(authCondition)(Feed);
// export default Feed;
