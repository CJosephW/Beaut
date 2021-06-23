import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import App from './JS/App';
import { ContainerProvider } from './stores/ContainerContext';
import './style/index.scss';


ReactDOM.render(
  <ContainerProvider>
    <App />
  </ContainerProvider>,
  document.getElementById('root')
);

