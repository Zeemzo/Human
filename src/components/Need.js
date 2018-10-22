import * as React from "react";
import { Col, Grid, Thumbnail,Row, Image } from "react-bootstrap";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";
import { HUMANBACKEND } from "../constants/routes";
import Trigger from "./Trigger";
class Need extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
      loading: true
    };
  }
componentDidMount(){
  console.log(localStorage.getItem('token'));
    const token = localStorage.getItem('token')
    const now = new Date;

    const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    axios
      .get(HUMANBACKEND + "/api/request/getall/" + utc_timestamp + "/need/", {
        headers: { 'Authorization': "bearer " + token,"Content-Type": "application/json",'Access-Control-Allow-Origin':'*',
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
        arr=arr.reverse();

        console.log(arr);
        this.setState({ needs: arr });
      })
      .catch((err) => { })

}
 
  render() {
    return (
      <Grid>
        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
        {this.state.needs.length==0 && !this.state.loading? 
         <h2>No Requests Available</h2> : <div>
        {this.state.needs.map((item, i) => (
          <Thumbnail key={i}>
            <Grid>
              <Row>
                <Col xs={7} md={4} lg={5}>
                  <Image width="250" height="300" src={item.image} rounded />
                </Col>
                <Col xs={7} md={4} lg={5}>
                  <h3>Request ID: {item.id}</h3>
                  <p>
                    <span className="input-label">
                     
                      Type: {item.requestType}
                      <br /> 
                      email: {item.email}
                      <br />
                      Resource: {item.resourceType}
                      <br />
                      Servings: {item.quantity}
                      <br />
                    </span>
                    <p>Description : {item.description}</p>
                    <Trigger item={item} />
                  </p>
                </Col>
              </Row>
            </Grid>
          </Thumbnail>

        ))}
         </div>
        }
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Need);
