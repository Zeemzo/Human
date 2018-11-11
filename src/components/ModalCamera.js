import { Button, Modal, Image, Grid,Row,Col } from 'react-bootstrap';
import withAuthorization from './withAuthorization';

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import * as React from 'react';

class ModalCamera extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false,
            showPhoto: false,
            src: '',
            loaded: true,
            idealFacingMode: FACING_MODES.ENVIRONMENT,
            flip: false,

        };
        // this.sendMessage = this.sendMessage.bind(this)
        this.onTakePhoto = this.onTakePhoto.bind(this)
        this.renderButtons = this.renderButtons.bind(this);
    }


    renderButtons() {


        return (
            <div>
                <Button onClick={(e) => {
                    this.setState({ flip: !this.state.flip })
                    if (this.state.flip) {
                        this.setState({ idealFacingMode: FACING_MODES.USER });
                        e.preventDefault()
                    } else {
                        this.setState({ idealFacingMode: FACING_MODES.ENVIRONMENT });
                        e.preventDefault()

                    }
                }}> Flip </Button>
            </div>
        );
    }
    componentWillUnmount() {
        this.setState({ loaded: false })
    }


    onTakePhoto(dataUri) {

        console.log(dataUri);
        this.setState({ src: dataUri })
        this.props.DataUrl(dataUri)

        this.setState({ showPhoto: true })

    }

    handleHide() {
        this.setState({ show: false });
    }


    render() {
        const wellStyles = { maxWidth: 300 };

        return (
            // style={{ height: 200 }}
            <Grid><Row><Col xs={12} sm={12} md={12} lg={12}>
                <div > {
                    this.state.showPhoto ? <Image
                        style={wellStyles}
                        src={this.state.src} /> : null
                }
                    {this.state.showPhoto ? <Button
                        // bsStyle="info"
                        style={wellStyles}
                        block
                        bsSize="medium"
                        onClick={() => this.setState({ show: true })}
                    >Retake Photo</Button> : <Button
                        // bsStyle="info"
                        style={wellStyles}
                        block
                        bsSize="medium"
                        onClick={() => this.setState({ show: true })}
                    >Take a Photo</Button>}



                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        container={this}
                    // bsSize="small"
                    >
                        <Modal.Header closeButton />

                        <Modal.Body>

                            {this.state.loaded ?
                                <div className="App">
                                    {this.renderButtons()}
                                    <p>
                                        {/* <Grid><Row><Col >  */}
                                        <Camera 
                                            onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                                            idealFacingMode={this.state.idealFacingMode}
                                            idealResolution={{ width: 640, height: 480 }}
                                            imageType={IMAGE_TYPES.JPG}
                                            imageCompression={0.95}
                                            isMaxResolution={false}
                                            isImageMirror={false}
                                            isDisplayStartCameraError={false}
                                        />
                                        {/* </Col></Row></Grid> */}
                                        </p>
                                </div> : null
                            }




                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div></Col></Row></Grid>
        );
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(ModalCamera);
