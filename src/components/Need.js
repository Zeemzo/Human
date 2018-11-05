import * as React from "react";
import { Col, Grid, Panel, Row, Image, Button } from "react-bootstrap";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";
import { HUMANBACKEND } from "../constants/routes";
import Trigger from "./Trigger";
import { ToastContainer, ToastStore } from 'react-toasts';

const now = new Date;
var count = 0;
const utc_timestamp = Date.UTC(
  now.getFullYear(),
  now.getMonth(),
  now.getDate()
);
class Need extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
      loading: true,
      startDate: utc_timestamp,
      UTC: utc_timestamp,
      count: 0,
    };

    this.handleChangePrev = this.handleChangePrev.bind(this)
    this.handleChangeNext = this.handleChangeNext.bind(this)
    // this.componentDidMount=this.componentDidMount.bind(this)

  }
  componentDidMount() {
    if (navigator.onLine) {

      console.log(localStorage.getItem('token'));
      const token = localStorage.getItem('token')
      axios
        .get(HUMANBACKEND + "/api/request/getall/" + utc_timestamp + "/need/", {
          headers: {
            'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
          }
        })
        .then(data => {
          this.setState({ loading: false });
          var obj = data.data;
          // console.log(obj);
          var arr = [];
          for (var key in obj) {
            obj[key].id = key;
            arr.push(obj[key]);
          }
          arr = arr.reverse();

          console.log(arr);
          this.setState({ needs: arr });
        })
        .catch((err) => { })
    }else{
      this.setState({ loading: false });
      ToastStore.error("Sorry, cannot display requests when offline!")

    }
  }

  handleChangePrev(e) {
    if (navigator.onLine) {

      this.setState({ needs: [] });

      this.setState({ loading: true });

      count++;
      const now = new Date;
      const utc_timestamp = Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - count
      );
      const token = localStorage.getItem('token')
      axios
        .get(HUMANBACKEND + "/api/request/getall/" + utc_timestamp + "/need/", {
          headers: {
            'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
          }
        })
        .then(data => {
          this.setState({ loading: false });
          var obj = data.data;
          var arr = [];
          for (var key in obj) {
            obj[key].id = key;
            arr.push(obj[key]);
          }
          arr = arr.reverse();
          console.log(arr);
          this.setState({ needs: arr });
        })
        .catch((err) => {
        })
      e.preventDefault();
    }else{
      this.setState({ loading: false });
      ToastStore.error("Sorry, cannot display requests when offline!")

    }
  }
  handleChangeNext(e) {
    if (navigator.onLine) {

      this.setState({ needs: [] });

      this.setState({ loading: true });

      console.log(count)

      count--;
      const now = new Date;
      const utc_timestamp = Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - count
      );
      console.log(count)

      const token = localStorage.getItem('token')
      axios
        .get(HUMANBACKEND + "/api/request/getall/" + utc_timestamp + "/need/", {
          headers: {
            'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
          }
        })
        .then(data => {

          this.setState({ loading: false });
          var obj = data.data;
          // console.log(obj);
          var arr = [];
          for (var key in obj) {
            obj[key].id = key;
            arr.push(obj[key]);
          }
          arr = arr.reverse();
          console.log(arr);
          this.setState({ needs: arr });
        })
        .catch((err) => {
        })
    }else{
      this.setState({ loading: false });
      ToastStore.error("Sorry, cannot display requests when offline!")

    }
    // this.setState({count:this.state.count-1});
  }

  render() {

    const now = new Date;
    const utc_timestamp = Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - count
    );

    const yesterday = Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );
    return (
      <Grid>
        <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
        {/* <Sort/> */}
        <h3>{(now.getDate() - count) > 0 ?
         <span>{now.getDate() - count}</span> :
          <span>{now.getDate() - count + 31}</span>}-{(now.getMonth()+1)}-{now.getFullYear()}</h3>



        {this.state.needs.length == 0 && !this.state.loading ? <div><p>
          <Button onClick={this.handleChangePrev}>Previous Day</Button>
          {utc_timestamp == this.state.startDate ?
            null : (utc_timestamp == yesterday ?
              <Button onClick={this.handleChangeNext}>Today</Button> :
              <Button onClick={this.handleChangeNext}>Next Day</Button>)}
          <h2>No Requests Available</h2></p></div> : <div><p>
            <Button onClick={this.handleChangePrev}>Previous Day</Button>
            {utc_timestamp == this.state.startDate ? null : (utc_timestamp == yesterday ?
              <Button onClick={this.handleChangeNext}>Today</Button> :
              <Button onClick={this.handleChangeNext}>Next Day</Button>)}</p>

            {this.state.needs.map((item, i) => (
              <Panel key={i}>
                <Grid>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Panel.Heading>
                        {/* <Grid> */}
                        <h4 > {item.title}</h4>
                        {/* </Grid> */}
                      </Panel.Heading>
                    </Col>

                    {item.image != "" ? <Panel.Body>

                      <Col xs={12} sm={6} md={6} lg={6}>
                        <p>
                          email: {item.email}
                          <br />
                          Resource: {item.resourceType}
                          <br />
                          Servings: {item.quantity}
                          <br />
                          {/* <p>Description : {item.description}</p> */}
                          <Trigger item={item} />
                        </p>
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={6}><Image width="250" src={item.image} rounded responsive /></Col>
                    </Panel.Body>

                      : <Panel.Body> <Col xs={12} sm={12} md={12} lg={12}>
                        {/* <h3>Request ID: {item.id}</h3> */}
                        <p>
                          email: {item.email}
                          <br />
                          Resource: {item.resourceType}
                          <br />
                          Servings: {item.quantity}
                          <br />
                          {/* <p>Description : {item.description}</p> */}
                          <Trigger item={item} />
                        </p>
                      </Col></Panel.Body>}
                    {/* // <Image width="250" src={item.image} rounded /> */}
                    {/* </Col> */}

                  </Row>
                </Grid>
              </Panel>
            ))}
            <Grid><Row><Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
              // style={override}
              sizeUnit={"px"}
              size={100}
              color={"green"}
              loading={this.state.loading}
            // style="text-align:center"
            /></p></Col></Row></Grid>
          </div>
        }

      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Need);
