import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css';

import { signIn } from './firebase/auth';
import { initSW } from './serviceWorkers/index';

signIn();
initSW();

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
