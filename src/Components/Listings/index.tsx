import * as React from 'react';
import { Col,Grid, Row, Thumbnail } from 'react-bootstrap';
import tumb from './thumbnail.png';



export default class Listings extends React.Component {
  public render() {
          return (  
            // tslint:disable:jsx-boolean-value
            <Grid>
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
  <Row>
    <Col xs={3} md={5}>
      <Thumbnail href="#" alt="171x180"  src={tumb} />
      <label>blablabla</label>
    </Col>
    <Col xs={3} md={5}>
      <Thumbnail href="#" alt="171x180"  src={tumb} />
      <label>blablabla</label>
    </Col>  
  </Row> <Row>
    <Col xs={3} md={5}>
      <Thumbnail href="#" alt="171x180"  src={tumb} />
      <label>blablabla</label>
    </Col>
    <Col xs={3} md={5}>
      <Thumbnail href="#" alt="171x180"  src={tumb} />
      <label>blablabla</label>
    </Col>  
  </Row>
</Grid>
 );
  }
}


