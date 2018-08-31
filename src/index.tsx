import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import App2 from './App2';
import App3 from './App3';
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

ReactDOM.render(
  <App3 />,
  document.getElementById('root2') as HTMLElement
);
registerServiceWorker();
