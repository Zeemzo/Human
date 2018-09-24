import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES }from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import withAuthorization from './withAuthorization';
// import {withRouter} from 'react'
// import AddRequest from '../components/AddRequest'

class Cam extends Component {

    constructor(props){
        super(props)
        this.state={
            src:'',
            // taken:true,
        }
    }
  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    console.log(dataUri);
    this.setState({src:dataUri})
    this.props.DataUrl(dataUri)
    // withRouter(AddRequest)
    // this.setState({taken:false})


  }
 
  render () {
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 1280, height: 720}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.50}
          // isMaxResolution = {false}
          // isImageMirror = {false}
          // isDisplayStartCameraError = {true}       
           />
      </div>
    );
  }
}
 
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Cam);
// export default ;