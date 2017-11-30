/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import Database from './data/database';

import './index.html';
import './style/index.scss';
import './style/splash.scss';
import './assets/icons/logo.svg';

const PROPERTIES = require('../properties/app');

const database = new Database('MyOwnPortfolioDB', PROPERTIES);

ReactDOM.render(
  <App database={database} version={PROPERTIES.version} />,
  document.getElementById('root'),
);
