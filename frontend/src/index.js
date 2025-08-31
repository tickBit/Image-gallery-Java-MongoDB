import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';

import { AuthProvider } from './AuthContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <AuthProvider>
          <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
