import { Button, Modal } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
import { Col, Grid, Thumbnail, Panel } from 'react-bootstrap';
import DisplayLoc from './DisplayLocation';
import axios from 'axios';
import { HUMANBACKEND } from '../constants/routes';
import * as React from 'react';
import { auth } from '../firebase/firebase'


class Trigger extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);
    
        this.state = {
            show: false,
            item: this.props.item
        };
    }

    handleHide() {
        this.setState({ show: false });
    }

    onSubmit = (event) => {
        // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZWVtYXNocmFmQG91dGxvb2suY29tIiwiaWF0IjoxNTM3NjE2Mjk4fQ.RWrfOXSu7i3YnCjb1LfCz1ws4_L5bujeYg19PQKon9s";
        //    console.log(this.state);
        const token = localStorage.getItem('token')
        // console.log(this.state.item);
        // this.set/
        
        // auth.currentUser.email
        const lol=this.state.item;
        lol.sender=auth.currentUser.email                 //updating value
        // this.setState({jasper});
        console.log(lol);
        axios
            .post(HUMANBACKEND + '/api/request/accept', lol, {
                headers: { "Content-Type": "application/json",'Authorization': "bearer " + token }
              })
            .then((res) => {
                console.log(res.data);
                // this.setState(byPropKey('error', res))
            }).catch((error) => {
                console.log(error);
                // this.setState(byPropKey('error', error.message))

            });


        event.preventDefault();
    }
    render() {
        return (
            <div style={{ height: 200 }}>
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
                            {this.state.item.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel >
                            {/* <Panel.Heading>Request ID: {this.state.item.id}</Panel.Heading> */}
                            <Panel.Body>
                                <Col xs={15} md={0}>
                                    <Thumbnail href="#" alt="171x180" src={this.state.item.image} />
                                    <DisplayLoc latitude={this.state.item.latitude} longitude={this.state.item.longitude} />
                                    <span className="input-label">
                                        email: {this.state.item.email} | Type: {this.state.item.type} | Latitude: {this.state.item.latitude} | Longitude: {this.state.item.longitude}
                                    </span>
                                    <p>Description : {this.state.item.description}</p>
                                    <form onSubmit={this.onSubmit}>
                                        <input
                                            value={this.state.item}
                                            type="hidden"
                                        />
                                        <button type="submit">
                                            Accept Provision</button>
                                    </form>
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