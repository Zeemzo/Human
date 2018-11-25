import * as React from "react";
import AuthUserContext from '../authentication/AuthUserContext';
import { auth } from '../../firebase/firebase'

import { Tab, Row, Col, NavItem, Nav, Grid, Button } from "react-bootstrap";
import withAuthorization from "../authentication/withAuthorization";
import Provision from "./Provision";
import Need from "./Need";
import Contributor from "./Contributor";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: auth.currentUser.displayName == "CONTRIBUTOR"?3:1 }
  }
 

  render() {
    const{activeKey}=this.state;
    return (

      <Tab.Container id="uncontrolled-tab-example" defaultActiveKey={activeKey}>
        <Grid>
        <br/>

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