import React, { Component } from 'react'
import { auth as Auth } from "../firebase/firebase";
import autoscroll from 'autoscroll-react'

// import {Image} from 'react-bootstrap'
class MessagesList extends Component {
constructor(props){
  super(props)
  this.state={image:[]}
}


  render() {
    const styles = {
      container: {
        overflowY: 'scroll',
        flex: 1,
      },
      ul: {
        listStyle: 'none',
      },
      li: {
        marginTop: 13,
        marginBottom: 13,
        marginRight:13,
        // marginLeft:13,
      },
      receiverUsername: {
        fontWeight: 'bold',
        float: 'right',
        // fontSize: 20,
      },
      senderUsername: {
        fontWeight: 'bold',
        float: 'left',

        // fontSize: 20,
      },
      messageA: { fontSize: 15,float: 'right', },
      messageB: { fontSize: 15,float: 'left', },

    }
    return (
      <div
        style={{
          ...this.props.style,
          ...styles.container,
        }}
      >
        <ul style={styles.ul}>
          {this.props.messages.map((message, index) => (
            <li key={index} style={styles.li}>

              {Auth.currentUser.email == message.senderId ?
                <div>
                  <span style={styles.receiverUsername}>{message.senderId}</span>
                  {/* <br /> */}
                  <br />

                  <p style={styles.messageA}>{message.text}</p>
                </div>
                : <div>
                  <span style={styles.senderUsername}>{message.senderId}</span>
                  {/* <br /> */}
                  <br />

                  <p style={styles.messageB}>{message.text}</p>
                </div>}
                <br />
                  <br />
             


            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default autoscroll(MessagesList)