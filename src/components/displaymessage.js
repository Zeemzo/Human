import { Button, Modal } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
import {  Panel } from 'react-bootstrap';
// import DisplayLoc from './DisplayLocation';
// import axios from 'axios';
// import Chatkit from '@pusher/chatkit'

// import { HUMANBACKEND } from '../constants/routes';
import * as React from 'react';
// import { auth } from '../firebase/firebase'
// import SendMessageForm from './ChatSendMessageForm';

// import {HUMANBACKEND} from '../constants/routes'


class Success extends React.Component {
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
        // this.sendMessage = this.sendMessage.bind(this)

    }

    handleHide() {
        this.setState({ show: false });
    }
   

   

    render() {
        return (
            // style={{ height: 200 }}
            <div >
                <Button
                    bsStyle="primary"
                    bsSize="large"
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
                            Dialog Box
 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel >
                            {/* <Panel.Heading>Request ID: {this.state.item.id}</Panel.Heading> */}
                            <Panel.Body>
                                
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
export default withAuthorization(authCondition)(Success);
