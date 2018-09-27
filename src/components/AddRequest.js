// import { Col, Grid, Thumbnail } from 'react-bootstrap';
import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { firebase } from '../firebase/index';
import axios from 'axios';
import { HUMANBACKEND } from '../constants/routes';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import Mappy from './map'
import Cam from './camera'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    resourceType: '',
    description: '',
    email: '',
    latitude: null,
    longitude: null,
    status: false,
    requestType: '',
    image: '',
    error: null,
};


class AddRequest extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    componentDidMount() {
        var user = firebase.auth.currentUser;
        if (user) {
            this.setState(byPropKey('email', user.email))
            this.setState(byPropKey('userId', user.uid))

        }
    }
    onSubmit = (event) => {
        // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZWVtYXNocmFmQG91dGxvb2suY29tIiwiaWF0IjoxNTM3NjE2Mjk4fQ.RWrfOXSu7i3YnCjb1LfCz1ws4_L5bujeYg19PQKon9s";
        //    console.log(this.state);
        const token = localStorage.getItem('token')
        // console.log(this.state);
        axios
            .post(HUMANBACKEND + '/api/request/add', this.state, {
                headers: { 'Authorization': "bearer " + token ,'Access-Control-Allow-Origin':'*',"Content-Type": "application/json",
            }
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
    handleLoc = (lat, lon) => {
        this.setState({ latitude: lat, longitude: lon });
    }

    handleImage = (DataUrl) => {
        this.setState({ image: DataUrl });
    }

    render() {
        const {
            resourceType,
            requestType,
            description,
            error,
        } = this.state;



        const isInvalid =
            resourceType === '' ||
            requestType === '' ||
            description === '';

        return (
            <form onSubmit={this.onSubmit}>
                {/* <input
                    value={resourceType}
                    onChange={event => this.setState(byPropKey('resourceType', event.target.value))}
                    type="text"
                    placeholder="Resource Type"
                /><br /> */}
                <h1>ADD REQUEST</h1>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Resource Type</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder="Resource Type"
                        onChange={event => this.setState(byPropKey('resourceType', event.target.value))}>
                        <option value="" >Select Resource Type</option>
                        <option value="food">food</option>
                        <option value="clothing">clothing</option>
                        <option value="other">other</option>
                    </FormControl>
                </FormGroup>
                {/* <input
                    value={requestType}
                    onChange={event => this.setState(byPropKey('requestType', event.target.value))}
                    type="text"
                    placeholder="Request Type"
                /> */}
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Request Type</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder="Request Type"
                        value={requestType}
                        onChange={event => this.setState(byPropKey('requestType', event.target.value))}>
                        <option value="" >Select Request Type</option>
                        <option value="need">need</option>
                        <option value="provision">provision</option>
                    </FormControl>
                </FormGroup>
                <br />
                <textarea 
                    value={description}
                    onChange={event => this.setState(byPropKey('description', event.target.value))}
                    type="text"
                    placeholder="Description"
                /><br />

                <Mappy loc={this.handleLoc} />
                <Cam DataUrl={this.handleImage} />
                <button disabled={isInvalid} type="submit">
                    Submit
            </button>

                <h1> {error && <p>{error.message}</p>}</h1>

            </form>
        );
    }

}


const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(AddRequest);