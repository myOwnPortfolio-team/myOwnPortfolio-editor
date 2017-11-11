/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import Loading from './components/Loading.jsx';
import { database, checkModules } from './database';

import './splash.html';
import './style/splash.scss';
import './assets/icons/logo.svg';

ReactDOM.render(
  <Loading database={database} checkModules={checkModules} />,
  document.getElementById('root'),
);
