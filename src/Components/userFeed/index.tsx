import * as React from 'react';
// tslint:disable:ordered-imports
import {Grid, Row, Col, Thumbnail, Nav, NavItem } from 'react-bootstrap';
import tumb from '../thumbnail.png';
import * as ReactDOM from 'react-dom';
import add from '../add.svg';

export default class UserFeed extends React.Component {

    public render() {
      return (
        // tslint:disable:jsx-boolean-value
        <div>
        <Nav bsStyle="tabs" activeKey="1" >
              <NavItem eventKey="1" onClick={userFeed} >
                Needs
              </NavItem>       
              <NavItem eventKey="2" onClick={userFeed}>
                Provision
              </NavItem>                          
              <NavItem eventKey="3" onClick={userFeed}>
                Requests
              </NavItem>
        </Nav>
        <img src={add} alt="add" />
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
