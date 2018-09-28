import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import { HUMANBACKEND } from '../constants/routes'
import MessageList from './MessageList'
import { auth } from '../firebase/firebase'
import withAuthorization from './withAuthorization';
import SendMessageForm from './ChatSendMessageForm'
                    const roomId=17275761


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
                        },
                    },
                })
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(error => console.error('error', error))
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
          text,
          roomId: parseInt(localStorage.getItem('roomId')),
        })
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
            },
            whosOnlineListContainer: {
                width: '300px',
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
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                        <h2>Whos online PLACEHOLDER</h2>
                    </aside>
                    <section style={styles.chatListContainer}>
                        <MessageList
                            messages={this.state.messages}
                            style={styles.chatList} />   </section>
                          <SendMessageForm sendMessage={this.sendMessage} />

                </div>
            </div>
        )
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(ChatScreen);