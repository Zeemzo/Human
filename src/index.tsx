import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import App2 from './App2';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

ReactDOM.render(
  <App2 />,
  document.getElementById('root1') as HTMLElement
);
registerServiceWorker();
