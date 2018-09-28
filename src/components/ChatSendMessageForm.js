import * as React from 'react';
import withAuthorization from './withAuthorization';

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
    const styles = {
             container: {
              padding: 20,
               borderTop: '1px #4C758F solid',
               marginBottom: 20,
             },
             form: {
               display: 'flex',
             },
             input: {
               color: 'inherit',
               background: 'none',
               outline: 'none',
               border: 'none',
               flex: 1,
               fontSize: 16,
             },
           }
    return (
      <div style={styles.container}>
       <div>
      <form
        onSubmit={this.handleSubmit}
        className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text" />
      </form></div></div>
    )
  }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(SendMessageForm);
    // export default Feed;
