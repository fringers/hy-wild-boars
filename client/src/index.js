import React from 'react';
import ReactDOM from 'react-dom';

import { signIn } from './firebase/auth';

signIn();

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
