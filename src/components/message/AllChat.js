import * as React from "react";
import {
  Col,
  Grid,
  Thumbnail,
  Row,
} from "react-bootstrap";
import { auth } from '../../firebase/firebase';
import * as routes from '../../constants/routes'

import axios from "axios";
import withAuthorization from "../authentication/withAuthorization";
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
    if (navigator.onLine) {
      if (localStorage.getItem('chat') != null) {

        var temp = JSON.parse(localStorage.getItem('chat'));

        console.log(temp)
        this.setState({ rooms: temp.chats.reverse() })
        // console.log(this.state.rooms[0])


      } else {
        var chats = [{ roomId: null, sender: "no chats", senderId: null }]
        this.setState({ rooms: chats })
        // console.log(this.state.rooms)

      }

      if (localStorage.getItem('image') == null) {
        const token = localStorage.getItem('token')

        axios.get(routes.HUMANBACKEND + '/api/user/viewImage/' + auth.currentUser.uid, {
          headers: {
            'Authorization': "bearer " + token,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
          }
        }
        ).then(
          (res) => {
            localStorage.setItem('image', res.data)
          }
        ).catch(
          localStorage.setItem('image', './human2.png')
        )
      }
    } else {
      if (localStorage.getItem('chat') != null) {

        var temp = JSON.parse(localStorage.getItem('chat'));

        console.log(temp)
        this.setState({ rooms: temp.chats.reverse() })
        // console.log(this.state.rooms[0])


      } else {
        var chats = [{ roomId: null, sender: "no chats", senderId: null }]
        this.setState({ rooms: chats })
        // console.log(this.state.rooms)

      }
    }

    // console.log(this.state.rooms)
  }

  componentWillUnmount() {
    if (localStorage.getItem("chat") != null) {
      const pop = localStorage.getItem("chat");

      console.log(pop)
      const token = localStorage.getItem('token')
      axios
        .post(routes.HUMANBACKEND + '/api/user/updateChat',
          { chat: btoa(pop), userId: auth.currentUser.uid },
          {
            headers: {
              'Authorization': "bearer " + token,
              'Access-Control-Allow-Origin': '*',
              "Content-Type": "application/json",
            }
          })
        .then((res) => {
          console.log(res)

        }).catch(res => { console.log(res.data) })

    }

  }

  // componentDidMount() {
  //     localStorage.setItem('roomId',this.state.rooms) ;
  //     console.log(localStorage.getItem('roomId'))
  //   }

  render() {
    return (
      <Grid>
    <br/>
    <br/>

        {this.state.rooms.map((item, i) => (
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
