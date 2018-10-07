import { Button, Modal } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
import {  Panel, Image } from 'react-bootstrap';
// import DisplayLoc from './DisplayLocation';
import axios from 'axios';
// import Chatkit from '@pusher/chatkit'
import * as routes from '../constants/routes'

import { HUMANBACKEND } from '../constants/routes';
import * as React from 'react';
// import { auth } from '../firebase/firebase'
// import SendMessageForm from './ChatSendMessageForm';

// import {HUMANBACKEND} from '../constants/routes'


class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: true,
            confirm: null,
            userDetails: null,
            src: null
        }
        // this.sendMessage = this.sendMessage.bind(this)
        this.confirm = this.confirm.bind(this)
        this.decline = this.decline.bind(this)

    }

    componentDidMount() {
        const lol = JSON.parse(localStorage.getItem('confirmDetails'));
        // console.log(lol);
        this.setState({ confirm: lol })

        console.log(this.state.confirm)

        const token = localStorage.getItem('token')
        // console.log(this.state);

        axios.get(routes.HUMANBACKEND + '/api/user/view/' + lol.senderId, {
            headers: {
                'Authorization': "bearer " + token,
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
            }
        }
        ).then((res) => {
            console.log(res.data)
            this.setState({ src: res.data.image });
            this.setState({ pushToken: res.data.pushToken });

            console.log(this.state)
        })


    }
    handleHide() {
        this.setState({ show: false });
        window.location.href =  routes.HUMANAPP+'/contributions';
        // window.location.href = 'http://localhost:3000/contributions';

    }
    confirm() {
        const token = localStorage.getItem('token')

        axios
            .post(HUMANBACKEND + "/api/user/done", { pushToken: this.state.pushToken, message: 'confirm' }, {
                headers: {
                    'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                }
            })
    }
    decline() {
        const token = localStorage.getItem('token')

        axios
            .post(HUMANBACKEND + "/api/user/done", { pushToken: this.state.pushToken, message: 'decline' }, {
                headers: {
                    'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                }
            })
    }




    render() {
        return (
            // style={{ height: 200 }}
            <div >


                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                // aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Confirm Contributer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Is this your contributor?</h2>

                        <Panel >
                            {/* <Panel.Heading>Request ID: {this.state.item.id}</Panel.Heading> */}
                            <Panel.Body>
                                <Image width={300} src={this.state.src} />
                                <Button onClick={this.confirm}>Confirm</Button>
                                <Button onClick={this.decline}>Decline</Button>

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
export default withAuthorization(authCondition)(Confirm);
