import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css'

import { signIn } from './firebase/auth';

signIn();

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
