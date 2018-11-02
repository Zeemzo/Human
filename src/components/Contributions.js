import * as React from "react";
import AuthUserContext from './AuthUserContext';
import { Tab, Row, Col, NavItem, Nav ,Grid} from "react-bootstrap";
import withAuthorization from "./withAuthorization";
import Fulfilled from "./fulfilled";
import Accepted from "./Accepted";

class Contributions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Container id="uncontrolled-tab-example" defaultActiveKey={1}>
      <Grid>
        <Row className="clearfix">
          <Col>


            <AuthUserContext.Consumer>
              {authUser =>
                <div><h2>
                  Hello {authUser.email}</h2>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey={1}>Fulfilled</NavItem>
                    <NavItem eventKey={2}>Unfulfilled</NavItem>
                    <NavItem eventKey={3}>Accepted</NavItem>

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
              <Tab.Pane eventKey={3}>
                <Accepted type={'accepted'} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row></Grid>
      </Tab.Container>

    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Contributions);
