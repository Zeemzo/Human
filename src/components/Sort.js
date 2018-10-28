import * as React from "react";
import {
    Overlay,Tooltip,Button,
  Col,
  Grid,
  Thumbnail,
  Row,
  Image,
  Panel,
  Label
} from "react-bootstrap";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactDOM from 'react-dom';

import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";
import { HUMANBACKEND } from "../constants/routes";
import Trigger from "./Trigger";

class Sort extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.getTarget = this.getTarget.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
  
      this.state = {
        show: false
      };
    }
  
    getTarget() {
      return ReactDOM.findDOMNode(this.target);
    }
  
    handleToggle() {
      this.setState({ show: !this.state.show });
    }
  
    render() {
      const sharedProps = {
        container: this,
        target: this.getTarget,
        show: this.state.show
      };
  
      return (
        <div style={{ position: 'fixed',opacity:60 }}>
          <Button
            ref={button => {
              this.target = button;
            }}
            onClick={this.handleToggle}
          >
           *
          </Button>

          <Overlay {...sharedProps} width={300} placement="bottom">
           
            <Panel>
            <Grid>
                <Col>
                <Label>lol</Label><br/>
                <Label>lol</Label><br/>
                <Label>lol</Label><br/>
                <Label>lol</Label><br/>
                <Label>lol</Label>

                </Col>
            </Grid></Panel>
           
          </Overlay>
        </div>
      );
    }
  }

  const authCondition = authUser => !!authUser;
  export default withAuthorization(authCondition)(Sort);
      // export default Feed;
  