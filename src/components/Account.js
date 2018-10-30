import React from "react";
import AuthUserContext from "./AuthUserContext";
import { PasswordForgetForm } from "./PasswordForget";
import PasswordChangeForm from "./PasswordChange";
import withAuthorization from "./withAuthorization";
import ModalCamera from "./ModalCamera";
import { auth } from '../firebase/firebase';
import axios from 'axios'
import * as routes from '../constants/routes'
import { ToastContainer, ToastStore } from 'react-toasts';

import {
  Grid,
  Row,
  Col,
  Image,
} from "react-bootstrap";

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      lol: true,
    }
    this.handleImage = this.handleImage.bind(this)
  }
  componentDidMount() {

    const token = localStorage.getItem('token')

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
        if (res.data.image != null) {
          this.setState({ src: res.data.image })

        } else {
          this.setState({ src: './human2.png' })

        }
        console.log(this.state)
      }
    ).catch(

    )

  }

  componentWillUpdate() {
  }

  handleImage(url) {


    if (!navigator.onLine) {
      ToastStore.error("Cannot Change Profile Picture if u are Offline!!")

    } else {
      this.setState({ lol: false })

      const token = localStorage.getItem('token')

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

          this.setState({ src: url })
          ToastStore.success("Profile Picture Changed!!")

        }).catch((error) => {
          console.log(error);
          ToastStore.Error("Profile Picture Not Changed!!")

        })


    }



  }
  render() {
    const wellStyles = { maxWidth: 300 };

    return (

      <AuthUserContext.Consumer>
        {authUser => (

          <Grid>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <h2>Account: {authUser.email}</h2>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Grid>
                  {
                    this.state.lol ? <Image style={wellStyles} src={this.state.src} responsive /> : null
                  }

                </Grid>
                <ModalCamera DataUrl={this.handleImage} />
                <hr />

              </Col>


              <Col xs={12} sm={6} md={6} lg={6} >
                <PasswordChangeForm />
                <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />

              </Col>
            </Row>
          </Grid>

        )}
      </AuthUserContext.Consumer>
    )
  }

}
const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(AccountPage);
