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
class MessageList extends React.Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map(message => {
                    return (
                        <li key={message.id}>
                            <div>
                                {message.senderId}
                            </div>
                            <div>
                                {message.text}
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(MessageList);
    // export default Feed;
