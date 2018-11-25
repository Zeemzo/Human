import * as React from "react";
import { Col, Grid, Thumbnail, Row, Image, Button } from "react-bootstrap";

import withAuthorization from "../authentication/withAuthorization";

import { Link } from "react-router-dom";
class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item:this.props.item,
            loading: true
        };
        this.update = this.update.bind(this)
    }

    update() {
        localStorage.setItem("update", JSON.stringify(this.state.item))
    }


    render() {
        return (

            <Link to={'/updateRequest'}>
                <Image id={"edit"} onClick={this.update} width={30} src={"./edit.png"}/>
            </Link>

        );
    }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Update);
    // export default Feed;
