import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './js/App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
