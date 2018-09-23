import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import jQuery from 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';

var root = jQuery('#root');
if(root.length)
{
    ReactDOM.render(<App />, root[0]);
    registerServiceWorker();
}
