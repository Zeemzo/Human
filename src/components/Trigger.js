import { Button, Modal } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
import { Col, Panel ,Image} from 'react-bootstrap';
import DisplayLoc from './DisplayLocation';
import axios from 'axios';
import Chatkit from '@pusher/chatkit'
import * as routes from '../constants/routes'

import { HUMANBACKEND } from '../constants/routes';
import * as React from 'react';
import { auth } from '../firebase/firebase'
// import SendMessageForm from './ChatSendMessageForm';

// import {HUMANBACKEND} from '../constants/routes'


class Trigger extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false,
            item: this.props.item,
            currentUsername: '',
            roomId: null,
            messages: ''
        };
        this.sendMessage = this.sendMessage.bind(this)

    }

    handleHide() {
        this.setState({ show: false });
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
                    addUserIds: [this.state.item.email]
                }).then(room => {
                    console.log(`Created room called ${room.name}`)
                    console.log(room.id)
                    localStorage.setItem('roomId', room.id);
                    this.setState({ roomId: room.id })

                    const token = localStorage.getItem('token')

                    const lol = this.state.item;
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
                            console.log(res.data);

                                        window.location.href= routes.HUMANAPP+'/chat';
                                        // window.location.href='http://localhost:3000/chat';

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
                <Button
                    bsStyle="success"
                    bsSize="medium"
                    onClick={() => this.setState({ show: true })}
                >Expand Request</Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                // aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            {this.state.item.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel >
                            {/* <Panel.Heading>Request ID: {this.state.item.id}</Panel.Heading> */}
                            <Panel.Body>

                                <Col  >
                                    <Image width="280" height="300" src={this.state.item.image} rounded />
                                    <br/>
                                    <br/>

                                    <DisplayLoc latitude={this.state.item.latitude} longitude={this.state.item.longitude} />

                                </Col>
                                <Col >
                                    <h3>Request ID: {this.state.item.id}</h3>
                                    <p>
                                        <span className="input-label">

                                            Type: {this.state.item.requestType}
                                            <br />
                                            email: {this.state.item.email}
                                            <br />
                                            Resource: {this.state.item.resourceType}
                                            <br />
                                            Servings: {this.state.item.quantity}
                                            <br />
                                            <p>Description : {this.state.item.description}</p>

                                        </span>



                                        {/* <Col xs={15} md={0}>
                                            <Thumbnail href="#" alt="171x180" src={this.state.item.image} />
                                            <DisplayLoc latitude={this.state.item.latitude} longitude={this.state.item.longitude} />
                                            <span className="input-label">
                                                email: {this.state.item.email} | Type: {this.state.item.type} | Latitude: {this.state.item.latitude} | Longitude: {this.state.item.longitude}
                                            </span>
                                            <p>Description : {this.state.item.description}</p> */}
                                        <form onSubmit={this.onSubmit}>
                                            <input
                                                value={this.state.item}
                                                type="hidden"
                                            />

                                            <input onChange={e => { this.sendMessage = e.target.value }} type="text" />
                                            <button type="submit">
                                                Accept Provision</button>
                                        </form>
                                        </p>
                                        </Col>
                            </Panel.Body>
                        </Panel>
                    </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                </Modal>
            </div>
                );
            }
        }
        
        const authCondition = (authUser) => !!authUser;
        export default withAuthorization(authCondition)(Trigger);
