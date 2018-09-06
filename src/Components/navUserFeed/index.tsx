import * as React from 'react';
// tslint:disable:ordered-imports
import { Nav,NavItem, Grid, Col, Row, Thumbnail} from 'react-bootstrap';
import UserFeed from '../userFeed';
import * as ReactDOM from 'react-dom';
import tumb from '../thumbnail.png';
import AddPage from '../addPage';
import add from '../add.svg';


export default class NavUserFeed extends React.Component {

 
    public render() {
      return (
        // tslint:disable:jsx-boolean-value
        /* Navbar */
        <div>
        <Nav bsStyle="tabs" activeKey="2" >
              <NavItem eventKey="1" onClick={userFeed}>
                Needs
              </NavItem>       
              <NavItem eventKey="2"  onClick={userFeed}>
                Provision
              </NavItem>                          
              <NavItem eventKey="3" onClick={userFeed}>
                Requests
              </NavItem>
        </Nav>
        <img src={add} alt="add" onClick={addPage}/>
        <Grid>
        <div className="Blocks">
        <Row>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>   
        </Row>
        </div>
        <div className="Blocks">
        <Row>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>   
        </Row>
        </div>
        <div className="Blocks">
        <Row>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>   
        </Row>
        </div>
        <div className="Blocks">
        <Row>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>   
        </Row>
        </div>
        <div className="Blocks">
        <Row>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>   
        </Row>
        </div>
        <div className="Blocks">
        <Row>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>
          <Col xs={3} md={5}>
            <Thumbnail href="#" alt="171x180"  src={tumb} />
            <label>blablabla</label>
          </Col>   
        </Row>
        </div>
      </Grid>
      </div>
      );
    }
  }

  
  function userFeed(){
    ReactDOM.render(
      <UserFeed />,
      document.getElementById('root1') as HTMLElement
    );
  }
  function addPage(){
    ReactDOM.render(
      <AddPage />,
      document.getElementById('root1') as HTMLElement
    );
  }