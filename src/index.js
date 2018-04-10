import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n/i18n';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router><Route path="/" component={App}/></Router>, document.getElementById('root'));
registerServiceWorker();
