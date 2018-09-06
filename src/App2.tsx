import * as React from 'react';
import { Button,ButtonToolbar } from 'react-bootstrap';
import * as ReactDOM from 'react-dom';
// import App from './App';
import './App.css';
// import App3 from './App3';
import AddRequest from './views/addRequest';
import  Feed from './views/feed';
import Login from './views/login';
import Register from'./views/register'


// import logo from './logo.svg';

class App2 extends React.Component {
  public render() {
    return (
      <ButtonToolbar>
  {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
  <Button bsStyle="primary" onClick={feed}>feed</Button>

  {/* Indicates a successful or positive action */}
  <Button bsStyle="success" onClick={register}>register</Button>

  {/* Contextual button for informational alert messages */}
  <Button bsStyle="info" onClick={login}>login</Button>

  {/* Indicates caution should be taken with this action */}
  <Button bsStyle="warning" onClick={add}>add</Button>

</ButtonToolbar>

    );
  }
}

function feed(){
  ReactDOM.render(
    <Feed />,
    document.getElementById('root2') as HTMLElement
  );
  
}

function login(){
  ReactDOM.render(
    <Login />,
    document.getElementById('root2') as HTMLElement
  );
  
}


function add(){
  ReactDOM.render(
    <AddRequest />,
    document.getElementById('root2') as HTMLElement
  );
  
}


function register(){
  ReactDOM.render(
    <Register />,
    document.getElementById('root2') as HTMLElement
  );
  
}

export default App2;
