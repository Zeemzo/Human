import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import { HUMANBACKEND } from '../constants/routes'
import MessageList from './MessageList'
import { auth } from '../firebase/firebase'
import withAuthorization from './withAuthorization';
import SendMessageForm from './ChatSendMessageForm'
// import axios from 'axios';
import { Button, Modal, Image, Grid,Row,Col } from 'react-bootstrap';


const roomId = 19164860


class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [""],
            room: null
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.handleHide = this.handleHide.bind(this);

    }


    componentDidMount() {

        this.setState({ room: this.props.room })
        if (this.props.room.sender != 'no chats') {
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
                    roomId: parseInt(this.state.room.roomId),
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
                .catch(error => {
                    console.error('error', error)

                })


        }





    }

    handleHide() {
        this.setState({ show: false });
    }



    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: parseInt(this.state.room.roomId),
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
                height: '75vh',
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
            <div ><Grid>
                <Row><Col xs={10} sm={10} md={10} lg={10}>
                    {this.props.room.sender != 'no chats' ?
                        <Button
                            // bsSize="large"
                            onClick={() => this.setState({ show: true })}
                        >{this.props.room.sender}</Button>
                        :
                        <Button 
                            disabled={true}
                            // bsSize="large"
                            onClick={() => this.setState({ show: true })}
                        >{this.props.room.sender}</Button>}
                </Col></Row>
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                // aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton />
                    {/* </Modal.Header> */}
                    <Modal.Body>


                        <div style={styles.container} width="280">
                            <h4 style={{ float: 'center', }}>{this.props.room.sender}</h4>
                            <div style={styles.chatContainer}>
                                {/* <below style={styles.whosOnlineListContainer}>
                        <h2>Whos online PLACEHOLDER</h2>
                    </below> */}
                                <section style={styles.chatContainer}>
                                    <MessageList
                                        messages={this.state.messages}
                                        />   </section>
                            </div>

                            <SendMessageForm sendMessage={this.sendMessage} />
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Grid>
            </div>

        )

    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(ChatScreen);