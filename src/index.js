import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './JS/App';
import { ContainerProvider } from './stores/ContainerContext';


ReactDOM.render(
  <ContainerProvider>
    <App />
  </ContainerProvider>,
  document.getElementById('root')
);

