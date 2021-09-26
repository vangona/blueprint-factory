import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./styles.css";
import * as serviceWorker from "./serviceWorkerRegistration";

const GlobalStyles = createGlobalStyle`
    ${reset};
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
