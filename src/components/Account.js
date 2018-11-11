import React from "react";
import AuthUserContext from "./AuthUserContext";
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
import { ClipLoader } from "react-spinners";

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      lol: true,
      loading: true,

    }
    this.handleImage = this.handleImage.bind(this)
  }
  componentDidMount() {
    if (navigator.onLine) {
      // this.setState({ loading: true })
      const token = localStorage.getItem('token')

      axios.get(routes.HUMANBACKEND + '/api/user/viewImage/' + auth.currentUser.uid, {
        headers: {
          'Authorization': "bearer " + token,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        }
      }
      ).then(
        (res) => {
          this.setState({ loading: false });

          console.log(res)
          if (res.data != "") {
            this.setState({ src: res.data })
            localStorage.setItem("image", res.data);

          } else {

            this.setState({ src: './sidebar.png' })

          }
        }
      ).catch(() => {
        this.setState({ loading: false });

        this.setState({ src:'./sidebar.png' })
      }

      )
    } else {
      if (localStorage.getItem("image") != null &&localStorage.getItem("image") != "") {
        this.setState({ loading: false });
        this.setState({ src: localStorage.getItem("image") })

      } else {
        this.setState({ loading: false });
        this.setState({ src: './sidebar.png' })
      }

    }

  }



  handleImage(url) {


    if (!navigator.onLine) {
      ToastStore.error("Cannot Change Profile Picture if u are Offline!!")
      this.setState({ lol: false })


    } else {
      // this.setState({ loading: true });

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
          // this.setState({ loading: false });

          this.setState({ src: url })
          ToastStore.success("Profile Picture Changed!!")

        }).catch((error) => {
          // this.setState({ loading: false });

          console.log(error);
          ToastStore.error("Profile Picture Not Changed!!")

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
                <h3>Account: {((authUser.email).toUpperCase().split("@"))[0]}</h3>
                {/* <h4>Role: {}</h4> */}

              </Col>
              <Col xs={12} sm={6} md={4} lg={4}>
                <Row><Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
                  // style={override}
                  sizeUnit={"px"}
                  size={100}
                  color={"green"}
                  loading={this.state.loading}
                // style="text-align:center"
                /></p></Col></Row>
                {/* </Grid> */}
                <Grid>
                  {
                    this.state.lol ? <Image style={wellStyles} src={this.state.src} responsive  /> : null
                  }

                </Grid>
                <ModalCamera id={"modalwidth"} DataUrl={this.handleImage} />
                

              </Col>


             
              


              <Col xs={12} sm={6} md={8} lg={8} > <hr />
              <h3>Change Your Password</h3>
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
