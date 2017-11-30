/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import SplashScreen from './components/SplashScreen.jsx';
import { database, checkModules } from './database';
import Database from './data/database';

import './splash.html';
import './style/splash.scss';
import './assets/icons/logo.svg';

const PROPERTIES = require('../properties/app');

const database = new Database('MyOwnPortfolioDB', PROPERTIES);

ReactDOM.render(
  <SplashScreen database={database} checkModules={checkModules} />,
  document.getElementById('root'),
);
