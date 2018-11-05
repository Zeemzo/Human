import { Button, Grid, Row, Col } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
import axios from 'axios';
import { HUMANBACKEND } from '../constants/routes';
import * as React from 'react';
import { auth } from '../firebase/firebase'
import { ToastContainer, ToastStore } from 'react-toasts';
import { ClipLoader } from "react-spinners";

class Fulfillment extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            show: false,
            provision: this.props.item.provision,
            need: this.props.item.need,
            match: this.props.item,
            loading: false,

        };
        this.provisionReceived = this.provisionReceived.bind(this)
        this.needFulfilled = this.needFulfilled.bind(this)
    }

    provisionReceived() {
        this.setState({ loading: true })

        const token = localStorage.getItem('token')

        console.log(this.state.provision)

        const pack = this.state.provision
        pack.senderId = auth.currentUser.uid

        console.log(pack)

        axios
            .post(HUMANBACKEND + "/api/request/fulfill", pack, {
                headers: {
                    'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                }
            }).then(() => {
                ToastStore.success("Provision Fulfillment Request Sent!!")

                this.setState({ loading: false })

            })

    }

    needFulfilled() {
        this.setState({ loading: true })

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
                    .post(HUMANBACKEND + "/api/request/fulfillmatch", { matchId: this.state.match.matchId,datestamp:this.state.match.datestamp }, {
                        headers: {
                            'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                        }
                    }).then(() => {
                        this.setState({ loading: false })

                        ToastStore.success("Need Fulfillment Request Sent!!")


                    })
            })


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
                <Button onClick={this.provisionReceived}>Provision Received</Button>
                <Button onClick={this.needFulfilled}>Need Fulfilled</Button>

            </div>
        );
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Fulfillment);
