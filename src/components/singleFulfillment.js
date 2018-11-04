import { Button, Grid, Row, Col } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
import axios from 'axios';
import { HUMANBACKEND, HUMANAPP } from "../constants/routes";
import * as React from 'react';
import { auth } from '../firebase/firebase'
import { ToastContainer, ToastStore } from 'react-toasts';
import { ClipLoader } from "react-spinners";

class SingleFulfillment extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            show: false,
            need: this.props.item,
            loading: false,

        };
        this.needFulfilled = this.needFulfilled.bind(this)
    }

 

    needFulfilled() {
        this.setState({ loading: true })

        const token = localStorage.getItem('token')
        console.log(this.state.need)

        const pack = this.state.need
        pack.senderId = auth.currentUser.uid

        console.log(pack)

        axios
            .post(HUMANBACKEND + "/api/request/selfFulfill", pack, {
                headers: {
                    'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                }
            }).then(() => {
                this.setState({ loading: false
                 })

                        ToastStore.success("Request Flagged as Fulfilled!!")
                        window.location.href = HUMANAPP + '/contributions';

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
                {/* <Button onClick={this.provisionReceived}>Provision Received</Button> */}
                <Button onClick={this.needFulfilled} bsStyle={"success"}>Mark as Fulfilled</Button>

            </div>
        );
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(SingleFulfillment);
