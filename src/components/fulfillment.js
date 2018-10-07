import { Button } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
// import { Col, Grid, Thumbnail, Panel, Image } from 'react-bootstrap';
// import DisplayLoc from './DisplayLocation';
import axios from 'axios';
// import Chatkit from '@pusher/chatkit'

import { HUMANBACKEND } from '../constants/routes';
import * as React from 'react';
import { auth } from '../firebase/firebase'
// import SendMessageForm from './ChatSendMessageForm';

// import {HUMANBACKEND} from '../constants/routes'


class Fulfillment extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            show: false,
            provision: this.props.item.provision,
            need: this.props.item.need,
            match: this.props.item,
        };
        // this.sendMessage = this.sendMessage.bind(this)
        this.provisionReceived = this.provisionReceived.bind(this)
        this.needFulfilled = this.needFulfilled.bind(this)
    }

    provisionReceived() {
        const token = localStorage.getItem('token')

        console.log(this.state.provision)

        // const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        const pack = this.state.provision
        pack.senderId = auth.currentUser.uid

        console.log(pack)

        axios
            .post(HUMANBACKEND + "/api/request/fulfill", pack, {
                headers: {
                    'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                }
            })

    }

    needFulfilled() {
        const token = localStorage.getItem('token')
        console.log(this.state.need)

        const pack = this.state.need
        pack.senderId = auth.currentUser.uid

        console.log(pack)

        axios
            .post(HUMANBACKEND + "/api/request/fulfill", pack, {
                headers: {
                    'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                }
            }).then(() => {
                axios
                    .post(HUMANBACKEND + "/api/request/fulfillmatch", {matchId:this.state.match.matchId}, {
                        headers: {
                            'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                        }
                    }).then(()=>{})
            })


    }




    render() {


        return (
            <div >

                <Button onClick={this.provisionReceived}>Provision Received</Button>
                <Button onClick={this.needFulfilled}>Need Fulfilled</Button>

            </div>
        );
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Fulfillment);
