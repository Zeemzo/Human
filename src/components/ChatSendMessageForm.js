import * as React from 'react';
// import { Tab, Tabs} from 'react-bootstrap';
// import tumb from './thumbnail.png';
// import axios from 'axios';
// import { ClipLoader } from 'react-spinners';
import withAuthorization from './withAuthorization';
// import { HUMANBACKEND } from '../constants/routes';
// import Provision from '../components/Provision'
// import Need from '../components/Need'

// // import store from '../store/index'
// const feed = () => {

// }

class SendMessageForm extends React.Component {
  
    render() {
      return (
        <div className="app">
          <Title />
          <MessageList />
          <SendMessageForm />
       </div>
      )
    }
  }

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(SendMessageForm);
    // export default Feed;
