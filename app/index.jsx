/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import { database, checkModules } from './database';
import './import.js';

ReactDOM.render(
  <App database={database} checkModules={checkModules} />,
  document.getElementById('root'),
);
