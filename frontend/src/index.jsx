import './index.css';

import { React, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { initMocks } from './test/server';

// initMocks();

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
