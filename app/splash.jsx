/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import SplashScreen from './components/SplashScreen.jsx';
import { database, checkModules } from './database';

import './splash.html';
import './style/splash.scss';
import './assets/icons/logo.svg';

ReactDOM.render(
  <SplashScreen database={database} checkModules={checkModules} />,
  document.getElementById('root'),
);
