import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App2 extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Go Home And Be Human</h1>
        </header>
      </div>
    );
  }
}

export default App2;
