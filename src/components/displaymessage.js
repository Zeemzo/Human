import { Button, Modal } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
import {  Panel } from 'react-bootstrap';
import * as React from 'react';
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
    }

    handleHide() {
        this.setState({ show: false });
    }
   
    render() {
        return (
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
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Dialog Box
 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel >
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
