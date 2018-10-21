import { Button, Modal, Image } from 'react-bootstrap';
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
        this.renderButtons = this.renderButtons.bind(this);
    }


    renderButtons() {
        return (
            <div>
                <button onClick={(e) => {
                    this.setState({ flip: !this.state.flip })
                    if (this.state.flip) {
                        this.setState({ idealFacingMode: FACING_MODES.USER });
                    }else{
                        this.setState({ idealFacingMode: FACING_MODES.ENVIRONMENT });

                    }
                }}> Flip </button>
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
        return (
            // style={{ height: 200 }}
            <div > {
                this.state.showPhoto ? <Image width={300} src={this.state.src} /> : null
            }
                {this.state.showPhoto ? <Button
                    bsStyle="success"
                    bsSize="medium"
                    onClick={() => this.setState({ show: true })}
                >Retake Photo</Button> : <Button
                    bsStyle="success"
                    bsSize="medium"
                    onClick={() => this.setState({ show: true })}
                >Take a Photo</Button>}



                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                // aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton />
                    {/* </Modal.Header> */}
                    <Modal.Body>

                        {this.state.loaded ?
                            <div className="App">
                                {this.renderButtons()}
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
                            </div> : null
                        }




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
export default withAuthorization(authCondition)(ModalCamera);
