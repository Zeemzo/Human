import * as React from 'react';

// import axios from 'axios';
import withAuthorization from './withAuthorization';
import MessageList from './ChatMessageList';



const DUMMY_DATA = [
    {
      senderId: "perborgen",
      text: "who'll win?"
    },
    {
      senderId: "janedoe",
      text: "who'll win?"
    }
  ]
class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
           messages: DUMMY_DATA
        }
      }
    render() {
      return (
        <div className="app">
          {/* <Title /> */}
          <MessageList messages={this.state.messages} />
          {/* <SendMessageForm /> */}
       </div>
      )
    }
  }

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Chat);
    // export default Feed;
