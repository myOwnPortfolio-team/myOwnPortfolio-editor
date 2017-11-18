/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import Loading from './components/Loading.jsx';
import Database from './data/database';

import './splash.html';
import './style/splash.scss';
import './assets/icons/logo.svg';

const PROPERTIES = require('../properties/app');

const database = new Database('MyOwnPortfolioDB', PROPERTIES);

ReactDOM.render(
  <Loading database={database} version={PROPERTIES.version} />,
  document.getElementById('root'),
);
