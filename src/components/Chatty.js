import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import { HUMANBACKEND } from '../constants/routes'
import MessageList from './MessageList'
import { auth } from '../firebase/firebase'
import withAuthorization from './withAuthorization';
import SendMessageForm from './ChatSendMessageForm'
import axios from 'axios';

                    // const roomId=17275761


class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [""]
        }
            this.sendMessage = this.sendMessage.bind(this)

    }


    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: "v1:us1:530428ef-4a08-417e-99d7-054b81d20f43",
            userId: auth.currentUser.email,
            tokenProvider: new Chatkit.TokenProvider({
                url: HUMANBACKEND + '/api/authenticate',
            }),
        })



        chatManager.connect().then(currentUser => {
                this.setState({ currentUser })
                 currentUser.subscribeToRoom({
                    roomId:parseInt(localStorage.getItem('roomId')),
                    // roomId:17275761,
                    // messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                            // window.scrollTo({left:0,top:10})
                        },
                    },
                })
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(error => console.error('error', error))
    }

    deleteRoom(){
        
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
          text,
          roomId: parseInt(localStorage.getItem('roomId')),
        })

        // const token = localStorage.getItem('token')
        // const request = {
        //     notification: {
        //         title: "You have a message from a fellow Human",
        //         body: "" + localStorage.getItem('roomId'),
        //         click_action: "https://human-24b1b.firebaseapp.com/chat"
        //     },
        //     priority : "high",

        //     to: pushToken

        // };


        // axios.post('https://fcm.googleapis.com/fcm/send', request, {
        //     headers: { 'Authorization': "key=AIzaSyCflWmYSu16ICHrJrZTXoQkVpl9Yc3174k" }
        // })

        
      }

    render() {

        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            },
            chatContainer: {
                display: 'flex',
                flex: 1,
                backgroundColor: '#2c303b',
                color: 'white',
            },
            whosOnlineListContainer: {
                width: '100%',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: 'white',
            },
            chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
               
            },
        }

        return (
            <div style={styles.container}>
            <h1 style={{float:'center',}}>CHAT</h1>
                <div style={styles.chatContainer}>
                    {/* <below style={styles.whosOnlineListContainer}>
                        <h2>Whos online PLACEHOLDER</h2>
                    </below> */}
                    <section style={styles.chatContainer}>
                        <MessageList
                            messages={this.state.messages}
                            style={styles.chatList} />   </section>
                     </div>  

                   <SendMessageForm sendMessage={this.sendMessage} />
                   
            </div>
        )
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(ChatScreen);