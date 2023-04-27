import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store.js'
// react toastify instead of reactalert
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // this will create and connect our app to redux store and also store our state with the browser 
  <Provider store={store} >
    <ToastContainer toast={toast} />
    <App />
  </Provider>
);

