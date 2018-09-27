import * as React from 'react';
import * as Chatkit from '@pusher/chatkit'
// import axios from 'axios';
import withAuthorization from './withAuthorization';
import MessageList from './ChatMessageList';
import SendMessageForm from './ChatSendMessageForm';
import Title from './ChatTitle';



const instanceLocator = "v1:us1:530428ef-4a08-417e-99d7-054b81d20f43"
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/530428ef-4a08-417e-99d7-054b81d20f43/token"
const username = "Farhan"
const roomId = 17207616



// const DUMMY_DATA = [
//     {
//         senderId: "perborgen",
//         text: "who'll win?"
//     },
//     {
//         senderId: "janedoe",
//         text: "who'll win?"
//     }
// ]


class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            messages:[]
        }
        // this.currentUser=nul
        this.sendMessage=this.sendMessage.bind(this)
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: instanceLocator,
            userId: username,
            tokenProvider: new Chatkit.TokenProvider({
                url: testToken
            })
        })

        chatManager.connect().then(currentUser => {
            // const lol=this.currentUser.

            currentUser.subscribeToRoom({
                roomId: roomId,
                hooks: {
                    onNewMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
            this.currentUser = currentUser;
            console.log(currentUser);
        })
    }



    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        })
    }
    render() {
        return (
            <div className="app">
                <Title user={'HUMAN CHAT'} />
                <MessageList messages={this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} />
            </div>
        )
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Chat);
    // export default Feed;
