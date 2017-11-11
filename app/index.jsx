/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import { database, checkModules } from './database';

import './index.html';
import './style/index.scss';
import './assets/icons/logo.svg';

ReactDOM.render(
  <App database={database} checkModules={checkModules} />,
  document.getElementById('root'),
);
