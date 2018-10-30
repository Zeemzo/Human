import withAuthorization from './withAuthorization';
import axios from 'axios';
import Chatkit from '@pusher/chatkit'
import * as routes from '../constants/routes'
import { HUMANBACKEND } from '../constants/routes';
import * as React from 'react';
import { auth } from '../firebase/firebase'
import { ToastContainer, ToastStore } from 'react-toasts';
import { ClipLoader } from "react-spinners";
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
class Trigger2 extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      show: false,
      item: this.props.item,
      currentUsername: '',
      roomId: null,
      messages: '',
      loading:false,
    };
    this.sendMessage = this.sendMessage.bind(this)

  }


  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  onSubmit = (event) => {
    this.setState({ loading: true })

    event.preventDefault();

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:530428ef-4a08-417e-99d7-054b81d20f43",
      userId: auth.currentUser.email,
      tokenProvider: new Chatkit.TokenProvider({
        url: HUMANBACKEND + '/api/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {

        this.setState({ currentUser })

        currentUser.createRoom({
          name: 'general',
          private: true,
          addUserIds: [this.state.item.needyEmail, this.state.item.giverEmail]
        })
          .then(room => {
            console.log(`Created room called ${room.name}`)
            console.log(room.id)
            if (localStorage.getItem('chat') != null) {
              var temp = JSON.parse(localStorage.getItem('chat'));
              temp.chats.push({
                roomId: room.id,
                sender: "" + this.state.item.needyEmail + "," + this.state.item.giverEmail,
              })
              localStorage.setItem('chat', JSON.stringify(temp))
              console.log(temp)
            } else {
              var chat = { chats: [] };
              chat.chats.push(
                {
                  roomId: room.id,
                  sender: "" + this.state.item.needyEmail + "," + this.state.item.giverEmail,
                }
              )
              localStorage.setItem('chat', JSON.stringify(chat))
            }
            this.setState({ roomId: room.id })

            const token = localStorage.getItem('token')

            const lol = this.state.item.need;
            lol.roomId = room.id
            lol.sender = auth.currentUser.email

            console.log(lol);

            this.state.currentUser.sendMessage({
              text: this.sendMessage,
              roomId: room.id,
            })

            axios
              .post(HUMANBACKEND + '/api/request/accept', lol, {
                headers: { "Content-Type": "application/json", 'Authorization': "bearer " + token }
              })
              .then((res) => {
                const lol1 = this.state.item.provision
                lol1.roomId = room.id
                lol1.sender = auth.currentUser.email
                console.log(lol1);
                axios
                  .post(HUMANBACKEND + '/api/request/accept', lol1, {
                    headers: { "Content-Type": "application/json", 'Authorization': "bearer " + token }
                  }).then(res => {

                    console.log(res.data);
                    const update = this.state.item
                    update.active = true

                    axios
                      .post(HUMANBACKEND + '/api/matchedRequest/updatematchrequest', update, {
                        headers: { "Content-Type": "application/json", 'Authorization': "bearer " + token }
                      }).then((res) => {
                        this.setState({ loading: false })

                        ToastStore.success("Matched request accepted!!!")

                        window.location.href = routes.HUMANAPP + '/chat';
                      }).catch()
                  }).catch(err => {

                  })
              }).catch((error) => {
                console.log(error);

              });


          }).catch(err => {
            console.log(`Error creating room ${err}`)
          })
      })
      .catch(error => console.error('error', error))
  }

  render() {


    return (
      <div >
        <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />

        <Grid><Row><Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
          // style={override}
          sizeUnit={"px"}
          size={30}
          color={"green"}
          loading={this.state.loading}
        // style="text-align:center"
        /></p></Col></Row></Grid>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.item}
            type="hidden"
          />

          <input onChange={e => { this.sendMessage = e.target.value }} type="text" placeholder="Enter Message" />
          <button type="submit">
            Send Message to Accept</button>
        </form>

      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Trigger2);
