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
const MODULE_SETTING_SCHEMA = require('../properties/module_setting_schema');

const database = new Database('MyOwnPortfolioDB', PROPERTIES);

ReactDOM.render(
  <App
    moduleSettingSchema={MODULE_SETTING_SCHEMA}
    database={database}
    version={PROPERTIES.version}
    serverHost={PROPERTIES.serverHost}
    serverPort={PROPERTIES.serverPort}
  />,
  document.getElementById('root'),
);
