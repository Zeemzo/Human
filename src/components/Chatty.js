import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import { HUMANBACKEND } from '../constants/routes'
import MessageList from './MessageList'
import { auth } from '../firebase/firebase'
import withAuthorization from './withAuthorization';
import SendMessageForm from './ChatSendMessageForm'
import axios from 'axios';
import { Button, Modal, Image, Grid, Row, Col } from 'react-bootstrap';
import * as routes from '../constants/routes'

// const roomId = 19164860


class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [""],
            room: this.props.room,
            image: null,
            chatty: [],
            lastMessage: ""
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.handleHide = this.handleHide.bind(this);

    }

    componentDidMount() {
        if (navigator.onLine) {
            if (this.state.room.sender != 'no chats') {
                var arr = this.state.room.senderId
                var arr2 = this.state.room.sender
                console.log(arr)
                console.log(this.state.room.sender)

                console.log(arr.length)
                arr.forEach((value, index) => {
                    const token = localStorage.getItem('token')
                    axios.get(routes.HUMANBACKEND + '/api/user/viewImage/' + value, {
                        headers: {
                            'Authorization': "bearer " + token,
                            'Access-Control-Allow-Origin': '*',
                            "Content-Type": "application/json",
                        }
                    }
                    ).then((res) => {
                        var email = this.state.room.sender
                        console.log(email[index])
                        var arr3 = this.state.chatty
                        if (arr3.length > 0) {
                            arr3.push({ image: res.data, email: email[index] })
                            console.log(arr3)
                            this.setState({ chatty: arr3 })
                            localStorage.setItem("chatty",JSON.stringify(arr3))
                        } else {
                            var email = this.state.room.sender
                            console.log(email[index])
                            var arr3 = []
                            arr3.push({ image: res.data, email: email[index] })
                            console.log(arr3)
                            this.setState({ chatty: arr3 })
                            localStorage.setItem("chatty",JSON.stringify(arr3))

                        }

                        console.log(arr3)
                    })
                })

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

                        hooks: {
                            onNewMessage: message => {
                                this.setState({
                                    messages: [...this.state.messages, message],
                                })
                                if (localStorage.getItem('chat') != null) {

                                    var temp = JSON.parse(localStorage.getItem('chat')).chats;

                                    // console.log(temp)
                                    temp.forEach((value,i)=>{
                                        if(value.roomId==this.state.room.roomId){
                                            // var test= [...this.state.messages, message]
                                            // var next=null
                                            // if(test.length>5){
                                            //     next=test.slice(test.length-4,test.length-1)
                                            // }else{
                                            //     next=test
                                            // }
                                            var test={}
                                            test.senderId=message.senderId
                                            test.roomId=message.roomId
                                            test.text=message.text

                                            var next=[test]
                                            // test.push(message)
                                            
                                            temp[i].mess=next
                                        }
                                    })
                                    // console.log(temp)
                                    var chat={chats:temp}
                                    localStorage.setItem("chat",JSON.stringify(chat))
                        
                                }

                                this.setState({ lastMessage: message })
                                // console.log(message)
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
        } else {
            if (localStorage.getItem('chat') != null) {

                // var temp = JSON.parse(localStorage.getItem('chat'));

                // console.log(temp)
                // temp.chats.forEach((value,i)=>{
                    var lastIndex= this.state.room.mess.length-1
                    this.setState({ messages: this.state.room.mess })
                    this.setState({ lastMessage: this.state.room.mess[lastIndex] })

                    this.setState({chatty:JSON.parse(localStorage.getItem("chatty"))})
                // })
                // console.log(this.state.rooms[0])

                // this.setState({ messages: arr3 })


            } else {
                // var chats = [{ roomId: null, sender: "no chats", senderId: null }]
                // this.setState({ room: chats })
                // console.log(this.state.rooms)

            }

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

        const { image } = this.state;
        return (
            <div ><Grid>
                <Row><Col xs={10} sm={10} md={10} lg={10}>
                    {this.props.room.sender != 'no chats' ?
                        <Button
                            // bsSize="large"
                            block
                            onClick={() => this.setState({ show: true })}
                        >
                            {this.state.chatty != null ? (this.state.chatty.map((item, i) => (
                                <Image key={i} height={30} src={item.image} rounded />
                            ))) : null}
                            {this.props.room.sender != null ? this.props.room.sender.map((item, i) => (
                                <span key={i}>{"           "}{item}<br></br></span>
                            )) : null}
                            {this.state.lastMessage != "" ? <div>"{this.state.lastMessage.text}"</div> : null

                            }</Button>
                        :
                        <Button
                            disabled={true}
                            // bsSize="large"
                            onClick={() => this.setState({ show: true })}
                        >{this.props.room.sender != null ?
                            <span >{"  "}{this.props.room.sender}</span>
                            : null}</Button>}
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
                            <h4 style={{ float: 'center', }}>{this.state.chatty != null ? (this.state.chatty.map((item, i) => (
                                <span key={i}><Image height={30} src={item.image} rounded />{" "}{item.email}<br></br></span>
                            ))) : null}</h4>
                            <div style={styles.chatContainer}>
                                {/* <below style={styles.whosOnlineListContainer}>
                        <h2>Whos online PLACEHOLDER</h2>
                    </below> */}
                                <section style={styles.chatContainer}>
                                    <MessageList chatty={this.state.chatty}
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