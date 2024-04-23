import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import jQuery from 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import { createRoot } from 'react-dom/client';

const APP_ROOT = document.querySelector('#root');
if (APP_ROOT) {
    const root = createRoot(APP_ROOT);
    root.render(<App />);
    registerServiceWorker();
}