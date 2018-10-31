import React, { Component } from "react";
import withAuthorization from "./withAuthorization";
import { firebase } from "../firebase/index";
import axios from "axios";
import AuthUserContext from './AuthUserContext';
import { HUMANBACKEND, HUMANAPP } from "../constants/routes";
import { ToastContainer, ToastStore } from 'react-toasts';
import { ClipLoader } from "react-spinners";
import * as routes from "../constants/routes"
import {
  Row,
  Grid,
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from "react-bootstrap";
import Mappy from "./map";
import ModalCamera from "./ModalCamera";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});


const INITIAL_STATE = {
  theme: "",
  error: null,
  loading: false,
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  componentDidMount() {
    // if (localStorage.getItem("SideMenu") != null) {
    //   var color = localStorage.getItem("SideMenu")
    //   this.setState({ theme: color })
    // }

  }
  onSubmit = (event) => {
    this.setState({loading:true})
    localStorage.setItem("SideMenu",this.state.theme )
    this.setState({loading:false})
    ToastStore.success("Theme Changed!!!")

    window.location.href = routes.HUMANAPP+'/settings';
  }


  render() {
    const {
      theme,
      error } = this.state;

    const isInvalid=theme === "";

    // const color={"color":"green","highlight":"green"}

    return (
      <Grid>

        <Form horizontal
          onSubmit={this.onSubmit}
        >

          <h2>Settings</h2>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Theme          </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <FormControl
                componentClass="select"
                placeholder="theme"
                onChange={event =>
                  this.setState(byPropKey("theme", event.target.value))
                }
              >
                <option
                //  id={"selection"}
                 value="">Select Theme</option>
                <option value="Green">Nature</option>
                <option value="Black">Sharp</option>
              </FormControl>
            </Col>
          </FormGroup>
          <Grid><Row><Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
            // style={override}
            sizeUnit={"px"}
            size={30}
            color={"green"}
            loading={this.state.loading}
          // style="text-align:center"
          /></p></Col></Row></Grid>
          <p>

            <Button bsStyle="success"
              bsSize="large" disabled={isInvalid} type="submit"
              // onClick={()=>this.onSubmit}
              onSubmit={this.onSubmit}
            >
              Apply Changes
        </Button></p>
          <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
          <h1>{this.state.error}</h1>
        </Form></Grid>
    );
  }
}

// const authCondition = authUser => !!authUser;
// export default withAuthorization(authCondition)(Settings);
export default (Settings);