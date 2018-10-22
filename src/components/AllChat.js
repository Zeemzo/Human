import * as React from "react";
import {
  Col,
  Grid,
  Thumbnail,
  Row,
  Image,
} from "react-bootstrap";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";
import ChatScreen from './Chatty';

class AllChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // rooms: [19164860,19164860,19164860]
      rooms: []

      //   loading: true
    };
  }

  componentDidMount() {
    if (localStorage.getItem('chat') != null) {

      var temp = JSON.parse(localStorage.getItem('chat'));
  
      this.setState({ rooms: temp.chats })

    } else {
      var chats=[{roomId:null,sender:"no chats"}]
      this.setState({ rooms: chats })

    }
    console.log(this.state.rooms)

  }

  // componentDidMount() {
  //     localStorage.setItem('roomId',this.state.rooms) ;
  //     console.log(localStorage.getItem('roomId'))
  //   }

  render() {
    return (
      <Grid>

        {this.state.rooms.reverse().map((item, i) => (
          <Thumbnail key={i}>
            <Grid>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <ChatScreen room={item} />
                </Col>
              </Row>
            </Grid>
          </Thumbnail>
        ))}

      </Grid>
    );

  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(AllChat);
// export default Feed;
