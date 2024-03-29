import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import ScrollToTop from './app/layout/ScrollToTop';
import 'react-toastify/dist/ReactToastify.min.css'
import "react-widgets/styles.css"
import dateFnsLocalizer from 'react-widgets-date-fns'

new dateFnsLocalizer()


export const history = createBrowserHistory();
ReactDOM.render(
  // <React.StrictMode>
    <Router history={history}>
       <ScrollToTop/>
          <App />
    </Router>
  //</React.StrictMode>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
