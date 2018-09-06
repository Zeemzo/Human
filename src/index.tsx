import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// tslint:disable:ordered-imports
import Home from './Components/home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

ReactDOM.render(
  <Home />,
  document.getElementById('root1') as HTMLElement
);
registerServiceWorker();
