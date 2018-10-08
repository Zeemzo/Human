// import { Button, Modal } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
// import { Col, Grid, Thumbnail, Panel, Image } from 'react-bootstrap';
// import DisplayLoc from './DisplayLocation';
import axios from 'axios';
import Chatkit from '@pusher/chatkit'
import * as routes from '../constants/routes'
import { HUMANBACKEND } from '../constants/routes';
import * as React from 'react';
import { auth } from '../firebase/firebase'
// import SendMessageForm from './ChatSendMessageForm';

// import {HUMANBACKEND} from '../constants/routes'


class Trigger2 extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      show: false,
      item: this.props.item,
      currentUsername: '',
      roomId: null,
      messages: ''
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
        // this.state.item.email
        currentUser.createRoom({
          name: 'general',
          private: true,
          addUserIds: [this.state.item.needyEmail, this.state.item.giverEmail]
        }).then(room => {
          console.log(`Created room called ${room.name}`)
          console.log(room.id)
          localStorage.setItem('roomId', room.id);
          this.setState({ roomId: room.id })

          const token = localStorage.getItem('token')

          const lol = this.state.item.need;
          lol.roomId = room.id
          lol.sender = auth.currentUser.email

          // lol.reqType=0
          console.log(lol);

          this.state.currentUser.sendMessage({
            text: this.sendMessage,
            roomId: parseInt(localStorage.getItem('roomId')),
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
                  const update=this.state.item
                  update.active=true
                  axios
                    .post(HUMANBACKEND + '/api/matchedRequest/updatematchrequest', update , {
                      headers: { "Content-Type": "application/json", 'Authorization': "bearer " + token }
                    }).then(() => {
                      window.location.href =  routes.HUMANAPP+'/chat';


                    }).catch()
                  // window.location.href='https://human-24b1b.firebaseapp.com/chat';
                }).catch(err => {

                })



              // this.setState(byPropKey('error', res))
            }).catch((error) => {
              console.log(error);
              // this.setState(byPropKey('error', error.message))

            });


        }).catch(err => {
          console.log(`Error creating room ${err}`)
        })
      })
      .catch(error => console.error('error', error))



    // window.location.href='https://human-24b1b.firebaseapp.com/chat';

    // event.preventDefault();
  }

  render() {


    return (
      // style={{ height: 200 }}
      <div >

        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.item}
            type="hidden"
          />

          <input onChange={e => { this.sendMessage = e.target.value }} type="text" />
          <button type="submit">
            Send Message to Accept</button>
        </form>

      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser ;
export default withAuthorization(authCondition)(Trigger2);