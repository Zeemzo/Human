import React from "react";
import AuthUserContext from "./AuthUserContext";
import { PasswordForgetForm } from "./PasswordForget";
import PasswordChangeForm from "./PasswordChange";
import withAuthorization from "./withAuthorization";
import ModalCamera from "./ModalCamera";
import { auth } from '../firebase/firebase';
import axios from 'axios'
import * as routes from '../constants/routes'

import {
  Grid,
  Row,
  Col,
  Image,
} from "react-bootstrap";
// import tumb from "./thumbnail.png";
// import { renderComponent } from "recompose";



class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      lol:true,
    }
this.handleImage=this.handleImage.bind(this)
    // this.view=th
  }
  componentDidMount() {

    const token = localStorage.getItem('token')
    // console.log(this.state);

    axios.get(routes.HUMANBACKEND + '/api/user/view/' + auth.currentUser.uid, {
      headers: {
        'Authorization': "bearer " + token,
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
      }
    }
    ).then(
      (res) => {
        console.log(res)
        this.setState({ src: res.data.image })
        console.log(this.state)
      }
    ).catch(
      // this.setState({src:'./human.png'})
    )

  }

  componentWillUpdate(){
  }

  handleImage(url) {

    this.setState({lol:false})

    const token = localStorage.getItem('token')
    // console.log(this.state);
    axios
      .post(routes.HUMANBACKEND + '/api/user/update', { userId: auth.currentUser.uid, image: url }, {
        headers: {
          'Authorization': "bearer " + token,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        console.log(res.data);
            // this.setState({view:false});

        this.setState({ src: url })
        // this.setState(byPropKey('error', "Request Added!!"))
      }).catch((error) => {
        console.log(error);
        // this.setState(byPropKey('error', "Request Not Added!!"))

      })


    }
  render() {
    return (

      <AuthUserContext.Consumer>
        {authUser => (
          //  <Jumbotron>
          <div>

            <Grid>
              <Row>
                <Col xs={10} md={8}>
                  <h2>Account: {authUser.email}</h2>
                </Col>
                <Col xs={10} md={8}>

                  {/* {/* <Image src={src} rounded /> */}

                  {/* <FieldGroup id="formControlsFile" type="file" /> */}
                  {
                    this.state.lol ? <Image width={300}   src={this.state.src} /> : null
                  }


                  <ModalCamera DataUrl={this.handleImage} />


                </Col>
              </Row>
              <Row>
                <PasswordForgetForm />
                <PasswordChangeForm />

              </Row>
            </Grid></div>

        )}
      </AuthUserContext.Consumer>
    )
  }

}
const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(AccountPage);
