import * as React from 'react';
import * as ReactDOM from 'react-dom';
// tslint:disable-next-line:ordered-imports
import { Button , Jumbotron } from 'react-bootstrap';
import Register from '../register';


export default class Home extends React.Component {
    public render() {
      return (
          <div>
        <Jumbotron>
  <h2> Being You!</h2>
  <p>
                HUMAN connects neighbours with each other so surplus food and other items can be shared,<br/> not thrown away.
                <br/>If you love food, hate waste, care about people or want to connect with your community,<br/> HUMAN is for you.
            </p>
  <p>
    <Button bsStyle="primary" onClick={register}>Join Now</Button>
  </p>
</Jumbotron>
</div>
      );
    }
  }

  function register(){
    ReactDOM.render(
      <Register />,
      document.getElementById('root1') as HTMLElement
    );
  }