import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';
import App from './components/App';
import "./styles.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

