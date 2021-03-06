/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import SplashPage from './pages/SplashPage.jsx';
import Database from './data/database';

import './splash.html';
import './style/splash.scss';
import './assets/icons/logo.svg';

const PROPERTIES = require('../properties/app');

const database = new Database('MyOwnPortfolioDB', PROPERTIES);

ReactDOM.render(
  <SplashPage
    database={database}
    serverHost={PROPERTIES.serverHost}
    serverPort={PROPERTIES.serverPort}
    serverWSPort={PROPERTIES.serverWSPort}
    serverGetURL={PROPERTIES.serverGetURL}
    version={PROPERTIES.version}
  />,
  document.getElementById('root'),
);
