import * as React from 'react';
import withAuthorization from '../authentication/withAuthorization';
import {
  Col,
  // Form,
  FormControl,
  FormGroup,
  ControlLabel,
  // Button
} from "react-bootstrap";
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
    e.preventDefault()

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

            <FormGroup controlId="formControlsText">
              <Col componentClass={ControlLabel} sm={2}>
                Message
          </Col>
              <Col xs={12} md={8}>
                <FormControl
                disabled={!navigator.onLine}
                  value={this.state.message}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Type your message and hit ENTER"
                  />
              </Col>
            </FormGroup>
              </form>
          </div></div>
    )
  }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(SendMessageForm);
    // export default Feed;
