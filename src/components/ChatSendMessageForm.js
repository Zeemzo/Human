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
    constructor() {
      super()
      this.state = {
        message: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
      this.setState({
        message: e.target.value
      })
    }
    handleSubmit(e) {
      
      this.props.sendMessage(this.state.message)
      this.setState({
        message: ''
      })
      e.preventDefault()
    }
    render() {
      return (
        <form
          onSubmit={this.handleSubmit}
          className="send-message-form">
          <input
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Type your message and hit ENTER"
            type="text" />
        </form>
      )
    }
  }
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(SendMessageForm);
    // export default Feed;
