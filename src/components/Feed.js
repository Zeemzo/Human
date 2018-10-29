import * as React from "react";
import AuthUserContext from './AuthUserContext';
import { Link } from "react-router-dom";

import { Tab, Row, Col, NavItem, Nav, Grid,Button } from "react-bootstrap";
import withAuthorization from "./withAuthorization";
import Provision from "../components/Provision";
import Need from "../components/Need";
import Contributor from "../components/Contributor";
import FloatingMenu from "./FloatingMenu"
import * as routes from "../constants/routes"
class Feed extends React.Component {
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
                  authUser.displayName == 'ADMIN' || authUser.displayName == 'CONTRIBUTOR' ?
                    <Nav bsStyle="tabs" >
                    
                      <NavItem eventKey={1}>Provision</NavItem>
                      <NavItem eventKey={2}>Need</NavItem>
                      <NavItem eventKey={3}>Match Request</NavItem>
                    </Nav>
                    :
                    <Nav bsStyle="tabs">
                      <NavItem eventKey={1}>Provision</NavItem>
                      <NavItem eventKey={2}>Need</NavItem>
                      <NavItem disabled eventKey={3}>Match Request</NavItem>
                    </Nav>

                }
              </AuthUserContext.Consumer>


            </Col>
            {/* <Link to={routes.ADDREQUEST}><FloatingMenu/>
            </Link>            <br /> */}
            <Col sm={8}>
            
              <Tab.Content animation>
                <Tab.Pane eventKey={1}>
                  <Provision type={"provision"} />
                </Tab.Pane>
                <Tab.Pane eventKey={2}>
                  <Need type={"need"} />
                </Tab.Pane>
                <Tab.Pane eventKey={3}>
                  <AuthUserContext.Consumer>
                    {authUser =>
                      authUser.displayName == "ADMIN" || authUser.displayName == 'CONTRIBUTOR' ?
                        <Contributor />
                        : <h1 >nanan</h1>
                    }
                  </AuthUserContext.Consumer>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row></Grid>
      </Tab.Container>

    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Feed);
// export default Feed;
