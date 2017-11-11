/* global document */
 
import React from 'react';
import ReactDOM from 'react-dom';
 
import App from './components/App.jsx';
 
import data from './config/app_properties.json';
import { database, checkModules } from './database';
 
import './import.js';
 
ReactDOM.render(
  <App data={data} database={database} checkModules={checkModules} />,
  document.getElementById('root'),
);
